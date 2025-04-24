const express = require('express');
const axios = require('axios');
const path = require('path');
const redis = require('./redis');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const dadosEstaticos = {
    titulo: 'Viajar.com',
    mensagem: 'Melhores passagens e hotéis, só na Viajar.com!'
};

async function getVoos() {
    let dadosVoo = await redis.getVoosCache();

    if(dadosVoo.length > 0) {
        console.log('Dados recuperados do cache');
    } else {
        try {
            const response = await axios.get("http://localhost:3000/voos");
            dadosVoo = response.data.data || [];

            if(dadosVoo.length > 0) {
                redis.setVoosCache(dadosVoo);
            }
        } catch (e) {
            console.error(`Erro ao obter os dados de voo. Erro: ${e}`);
        }
    }
    return dadosVoo;
}

app.get('/', async (req, res) => {
    const dados = {
        voos: await getVoos(),
        hoteis: null
    }
    res.render('index', { ...dadosEstaticos, dados: dados });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});