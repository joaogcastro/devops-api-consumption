const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const dadosEstaticos = {
    titulo: 'Viajar.com',
    mensagem: 'Melhores passagens direto na Viajar.com!'
};

app.get('/', (req, res) => {
    axios.get("http://127.0.0.1:3000/voo")
    .then(response => {
        const dadosVoo = response.data;
        // console.log(JSON.stringify(dadosVoo)); 
        res.render('index', { ...dadosEstaticos, dados: dadosVoo });
    })
    .catch(error => {
        console.error("Erro ao buscar dados:", error);
        res.status(500).send("Erro ao buscar dados");
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});