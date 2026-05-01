import pymysql

DB_HOST = "localhost"
DB_USER = "root"
DB_PASS = "Akash@123"
DB_NAME = "expense_db"

def get_db_connection():
    try:
        connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            database=DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        print(f"Error while connecting to MySQL: {e}")
    return None
