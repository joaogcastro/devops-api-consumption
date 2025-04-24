from flask import Flask, jsonify
import mysql.connector
import redis
import json
from decimal import Decimal

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

# Conexão com o Redis
r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

# Função para converter valores Decimal para float
def decimal_to_float(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f'Object of type {obj.__class__.__name__} is not serializable')

@app.route('/hotel', methods=['GET'])
def get_all_hoteis():
    # Verifica se os dados estão no cache Redis
    cached_hoteis = r.get('hoteis_cache')
    if cached_hoteis:
        # Se encontrar dados no cache, retorna esses dados
        print("Dados recuperados do cache")
        return jsonify(json.loads(cached_hoteis))

    # Caso não encontre no cache, faz a consulta ao banco de dados
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM hoteis")
    todos = cursor.fetchall()

    cursor.close()
    db.close()

    # Converte todos os valores Decimal para float
    todos_convertidos = [ {k: decimal_to_float(v) if isinstance(v, Decimal) else v for k, v in hotel.items()} for hotel in todos ]

    # Armazena os dados no cache Redis por 60 segundos
    r.setex('hoteis_cache', 60, json.dumps(todos_convertidos))

    print("Dados recuperados do banco de dados e armazenados no cache")
    return jsonify(todos_convertidos)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
