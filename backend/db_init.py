import pymysql
from db_config import DB_HOST, DB_USER, DB_PASS, DB_NAME

def init_db():
    try:
        connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS
        )
        cursor = connection.cursor()
        
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        print(f"Database '{DB_NAME}' checked/created successfully.")
        
        cursor.execute(f"USE {DB_NAME}")
        
        # Adding user_id to expenses table, so dropping it and recreating to be clean
        cursor.execute("DROP TABLE IF EXISTS expenses")
        cursor.execute("DROP TABLE IF EXISTS users")

        create_users_table_query = """
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
        """
        cursor.execute(create_users_table_query)
        print("Table 'users' checked/created successfully.")

        create_table_query = """
        CREATE TABLE IF NOT EXISTS expenses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount INT NOT NULL,
            date DATE NOT NULL,
            type VARCHAR(100) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """
        cursor.execute(create_table_query)
        print("Table 'expenses' checked/created successfully.")
        
        connection.commit()
        cursor.close()
        connection.close()
        print("Database initialization complete.")
    except Exception as e:
        print(f"Error during initialization: {e}")

if __name__ == '__main__':
    init_db()
