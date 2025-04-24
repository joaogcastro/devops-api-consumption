const express = require('express');
const mysql = require('mysql2');
const redis = require('redis');
const app = express();

// Configuração melhorada do Redis
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,  // Porta padrão do Redis é 6379
    },
    legacyMode: false // Usando a API moderna
});

// Tratamento de erros do Redis
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

// Conectando ao Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Conectado ao Redis com sucesso');
    } catch (err) {
        console.error('❌ Falha ao conectar ao Redis:', err);
    }
})();

// Configuração do MySQL
const dbConfig = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3308,
    user: process.env.DB_USER || "voo",
    password: process.env.DB_PASSWORD || "voo123",
    database: process.env.DB_NAME || "voos",
    waitForConnections: true,
    connectionLimit: 10
};

const pool = mysql.createPool(dbConfig);

// Middleware de cache melhorado
const checkCache = async (req, res, next) => {
    const cacheKey = 'voos:all'; // Chave de cache mais descritiva
    
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('📦 Dados recuperados do cache');
            return res.json({
                success: true,
                source: 'cache',
                data: JSON.parse(cachedData)
            });
        }
        next();
    } catch (err) {
        console.error('Erro no Redis (checkCache):', err);
        next(); // Continua mesmo com erro no Redis
    }
};

// Rota com cache e tratamento de erros
app.get("/voos", checkCache, async (req, res) => {
    try {
        const [voos] = await pool.promise().query('SELECT * FROM flights');
        
        // Armazena no Redis com TTL (30 minutos)
        try {
            await redisClient.setEx(
                'voos:all',
                60, // 30 minutos em segundos
                JSON.stringify(voos)
            );
            console.log('✏️ Dados armazenados no cache');
        } catch (redisErr) {
            console.error('Erro ao salvar no Redis:', redisErr);
        }

        res.json({
            success: true,
            source: 'database',
            data: voos
        });
    } catch (err) {
        console.error("Erro no MySQL:", err);
        res.status(500).json({
            success: false,
            message: "Erro no servidor"
        });
    }
});

// Health Check
app.get('/health', async (req, res) => {
    const checks = {
        mysql: false,
        redis: false
    };

    try {
        await pool.query('SELECT 1');
        checks.mysql = true;
    } catch (err) {
        console.error('Health Check MySQL failed:', err);
    }

    try {
        await redisClient.ping();
        checks.redis = true;
    } catch (err) {
        console.error('Health Check Redis failed:', err);
    }

    const status = checks.mysql && checks.redis ? 200 : 503;
    res.status(status).json({
        status: status === 200 ? 'healthy' : 'degraded',
        checks
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Encerrando conexões...');
    await redisClient.quit();
    pool.end();
    process.exit(0);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});