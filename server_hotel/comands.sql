use hoteis;

CREATE TABLE hoteis (
    id INTEGER PRIMARY KEY,
    nomeHotel TEXT NOT NULL,
    classificacao TEXT NOT NULL,
    plano TEXT NOT NULL
);

INSERT INTO hoteis (id, nomeHotel, classificacao, plano) VALUES
(1, 'Beira Mar', '4 estrelas', 'Café da manhã incluso'),
(2, 'Sol Nascente', '3 estrelas', 'Básico, apenas estadia com café da manhá incluso'),
(3, 'Mar Azul', '5 estrelas', 'All inclusive, estadia, café almoço e janta'),
(4, 'Pousada das Flores', '2 estrelas', 'Apenas estadia'),
(5, 'Hotel do Porto', '3 estrelas', 'Básico, apenas estadia com café da manhá incluso');

