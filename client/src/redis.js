const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: '',
  db: 0,
});

function normalizarString(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}

async function setVoosCache(voos, ttl = 60) {
    try {
        for (const voo of voos) {
            await redis.set(
                `front:voo:${normalizarString(voo.origem)}:${normalizarString(voo.destino)}`,
                JSON.stringify(voo),
                'EX',
                ttl
            );
        }
        console.log('Voos salvos no cache');
    } catch (error) {
        console.error('Erro ao salvar voos no cache:', error);
    }
}

async function getVoosCache() {
    try {
        const chaves = await redis.keys('front:voo:*');
        
        if (chaves.length === 0) {
            return [];
        }

        const valores = await redis.mget(chaves);

        const voos = valores
            .map(valor => {
                return JSON.parse(valor);
            })
            .filter(voo => voo !== null) || [];

        return voos;
    } catch (error) {
        console.error('Erro ao buscar voos no cache:', error);
        return [];
    }
}

module.exports = {
    setVoosCache,
    getVoosCache
};
