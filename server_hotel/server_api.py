from flask import Flask, jsonify
import mysql.connector
import redis
import json
from decimal import Decimal

# MySQL connection
def get_db_connection():
    return mysql.connector.connect(
        host='127.0.0.1',
        user='hotel',
        password='hotel123',
        database='hoteis',
        port=3310
    )

# Redis connection
redis_cache = redis.StrictRedis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True
)

# Função para obter todos os hotéis do banco de dados
def get_all_hoteis_from_db():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hoteis")
    result = cursor.fetchall()
    cursor.close()
    connection.close()

    for entry in result:
        # Converte os valores Decimal para float
        for key, value in entry.items():
            if isinstance(value, Decimal):
                entry[key] = float(value)

    return result

def store_hoteis_in_redis(hoteis):
    for hotel in hoteis:
        hotel_key = f"serverhotel:hotel:{hotel['id']}"
        redis_cache.setex(hotel_key, 300, json.dumps(hotel))  # TTL de 5 minutos
    print("Hotéis armazenados no Redis com sucesso.")

def get_hoteis_from_redis():
    hotel_keys = redis_cache.keys('serverhotel:hotel:*')
    hoteis = []
    for key in hotel_keys:
        hotel_data = redis_cache.get(key)
        hoteis.append(json.loads(hotel_data))

    if not hoteis:
        print("Nenhum hotel encontrado no Redis.")
        return None

    print(f"{len(hoteis)} hotéis encontrados no Redis.")
    return hoteis

# Flask app
app = Flask(__name__)

@app.route('/hotel', methods=['GET'])
def get_all_hoteis():
    hoteis = get_hoteis_from_redis()

    if not hoteis:
        print("Nenhum hotel encontrado no Redis, buscando no banco de dados...")
        hoteis = get_all_hoteis_from_db()
        if hoteis:
            store_hoteis_in_redis(hoteis)
        else:
            print("Nenhum hotel encontrado no banco de dados.")
            return jsonify({"message": "Nenhum hotel encontrado."}), 404

    return jsonify(hoteis)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
