const express = require('express');
const app = express();
app.use(express.json());

const voos =  [
    { id: 1, origem: 'São Paulo', destino: 'Rio de Janeiro', companhia: 'Latam', preco: 200 },
    { id: 2, origem: 'Belo Horizonte', destino: 'Salvador', companhia: 'Latam', preco: 250 },
    { id: 3, origem: 'Curitiba', destino: 'Florianópolis', companhia: 'Latam', preco: 150 },
    { id: 4, origem: 'Porto Alegre', destino: 'São Paulo', companhia: 'Latam', preco: 300 },
    { id: 5, origem: 'Rio de Janeiro', destino: 'Brasília', companhia: 'Latam', preco: 280 },
    { id: 6, origem: 'Fortaleza', destino: 'Recife', companhia: 'Latam', preco: 180 },
    { id: 7, origem: 'Salvador', destino: 'São Paulo', companhia: 'Latam', preco: 220 },
    { id: 8, origem: 'Manaus', destino: 'Belém', companhia: 'Latam', preco: 160 },
    { id: 9, origem: 'Natal', destino: 'João Pessoa', companhia: 'Latam', preco: 140 },
    { id: 10, origem: 'Goiânia', destino: 'Cuiabá', companhia: 'Latam', preco: 210 },
];

app.get("/voo", (req, res) => {
    const voo = voos.find(v => v.id === Number(req.query.id)) || voos;
    if (!voo) {
        return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(voo);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});