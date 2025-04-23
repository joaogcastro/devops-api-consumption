from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# Conexão com o banco MySQL
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='hotel',
        password='hotel123',
        database='hoteis',
        port='3310'
    )

@app.route('/hotel', methods=['GET'])
def get_all_hoteis():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM hoteis")
    todos = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(todos)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
