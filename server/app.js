const express = require('express');
const app = express();
app.use(express.json());

const voos = [
    { id: 1, origem: 'São Paulo', destino: 'Rio de Janeiro' },
    { id: 2, origem: 'Belo Horizonte', destino: 'Salvador' },
    { id: 3, origem: 'Curitiba', destino: 'Florianópolis' },
    { id: 4, origem: 'Porto Alegre', destino: 'São Paulo' },
    { id: 5, origem: 'Rio de Janeiro', destino: 'Brasília' },
    { id: 6, origem: 'Fortaleza', destino: 'Recife' },
    { id: 7, origem: 'Salvador', destino: 'São Paulo' },
    { id: 8, origem: 'Manaus', destino: 'Belém' },
    { id: 9, origem: 'Natal', destino: 'João Pessoa' },
    { id: 10, origem: 'Goiânia', destino: 'Cuiabá' },
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
