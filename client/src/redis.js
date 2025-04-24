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

async function setHoteisCache(hoteis, ttl = 60) {
    try {
        for (const hotel of hoteis) {
            await redis.set(
                `front:hotel:${normalizarString(hotel.nomeHotel)}`,
                JSON.stringify(hotel),
                'EX',
                ttl
            );
        }
        console.log('Hotéis salvos no cache');
    } catch (error) {
        console.error('Erro ao salvar hotéis no cache:', error);
    }
}

async function getHoteisCache() {
    try {
        const chaves = await redis.keys('front:hotel:*');

        if (chaves.length === 0) {
            return [];
        }

        const valores = await redis.mget(chaves);

        const hoteis = valores
            .map(valor => {
                return JSON.parse(valor);
            })
            .filter(hotel => hotel !== null) || [];

        return hoteis;
    } catch (error) {
        console.error('Erro ao buscar hotéis no cache:', error);
        return [];
    }
}

module.exports = {
    setVoosCache,
    getVoosCache,
    setHoteisCache,
    getHoteisCache
};
