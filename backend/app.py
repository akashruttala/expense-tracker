import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from db_config import get_db_connection
from etl_pipeline import process_file_data

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'.csv', '.xls', '.xlsx'}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'Name, email, and password are required'}), 400

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Check if user already exists
            cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                return jsonify({'error': 'Email already exists'}), 400

            # Storing password in plain text as requested
            query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, email, password))
            conn.commit()
            return jsonify({'message': 'User registered successfully!'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Email and password are required'}), 400

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, password FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            
            # Checking plain text password
            if user and user['password'] == password:
                return jsonify({
                    'message': 'Login successful',
                    'user': {
                        'id': user['id'],
                        'name': user['name'],
                        'email': user['email']
                    }
                }), 200
            else:
                return jsonify({'error': 'Invalid email or password'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/add-expense', methods=['POST'])
def add_expense():
    data = request.json
    user_id = data.get('user_id')
    title = data.get('title')
    amount = data.get('amount')
    date = data.get('date')
    exp_type = data.get('type')
    
    if not all([user_id, title, amount, date, exp_type]):
        return jsonify({'error': 'All fields are required including user_id'}), 400
        
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            query = "INSERT INTO expenses (user_id, title, amount, date, type) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(query, (user_id, title, amount, date, exp_type))
            conn.commit()
            return jsonify({'message': 'Expense added successfully!'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/get-expenses', methods=['GET'])
def get_expenses():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM expenses WHERE user_id = %s ORDER BY date DESC", (user_id,))
            expenses = cursor.fetchall()
            
            for exp in expenses:
                if exp.get('date'):
                    exp['date'] = exp['date'].strftime('%Y-%m-%d')
                    
            return jsonify(expenses), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/upload-file', methods=['POST'])
def upload_file():
    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1].lower()
    
    if ext not in ALLOWED_EXTENSIONS:
        return jsonify({'error': 'File format not allowed'}), 400
        
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    cleaned_data, message = process_file_data(filepath, ext)
    
    if os.path.exists(filepath):
        os.remove(filepath)
        
    if cleaned_data is None:
        return jsonify({'error': message}), 400
        
    if len(cleaned_data) == 0:
        return jsonify({'error': 'No valid data found in file.'}), 400
        
    # Append user_id to cleaned data
    final_data = [(user_id, *row) for row in cleaned_data]

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            query = "INSERT INTO expenses (user_id, title, amount, date, type) VALUES (%s, %s, %s, %s, %s)"
            cursor.executemany(query, final_data)
            conn.commit()
            return jsonify({'message': f'Successfully imported {cursor.rowcount} expenses!'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
            
    return jsonify({'error': 'Database connection failed'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
