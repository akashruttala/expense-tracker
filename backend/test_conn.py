import mysql.connector
from db_config import DB_HOST, DB_USER, DB_PASS
import traceback

try:
    print("Attempting to connect...")
    conn = mysql.connector.connect(host=DB_HOST, user=DB_USER, password=DB_PASS)
    print("Connected!", conn.is_connected())
except Exception as e:
    print("Exception!")
    traceback.print_exc()
