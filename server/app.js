const express = require('express');
const app = express();
app.use(express.json());

// In-memory database for demonstration
let voos = [
    { id: 1, numeroVoo: 'VA123', origem: 'GRU', destino: 'JFK', partida: '2023-05-20T10:00:00' },
    { id: 2, numeroVoo: 'VA456', origem: 'JFK', destino: 'GRU', partida: '2023-05-21T18:00:00' }
];

// GET all flights
app.get("/voo", (req, res) => {
    res.json(voos);
});

// GET a specific flight by ID
app.get("/voo/:id", (req, res) => {
    const voo = voos.find(v => v.id === parseInt(req.params.id));
    if (!voo) return res.status(404).json({ message: 'Flight not found' });
    res.json(voo);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});