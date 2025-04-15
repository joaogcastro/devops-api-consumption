const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dados estáticos que podem ser utilizados no template
const dadosEstaticos = {
    titulo: 'Viajar Ponto Com',
    mensagem: 'Escolha seu voo!',
    itens: ['Item 1', 'Item 2', 'Item 3'],
};

app.get('/', (req, res) => {
    axios.get("http://localhost:3000/voo")
    .then(response => {
        const dadosVoo = response.data; // Acesse os dados da resposta
        console.log(JSON.stringify(dadosVoo)); // Logar os dados recebidos
        // Passar dados estáticos e os dados do voo para o template
        res.render('index', { ...dadosEstaticos, dados: dadosVoo });
    })
    .catch(error => {
        console.error("Erro ao buscar dados:", error); // Logar o erro
        res.status(500).send("Erro ao buscar dados"); // Responder com erro
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});