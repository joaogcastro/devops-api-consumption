use hoteis;

CREATE TABLE hoteis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomeHotel VARCHAR(100) NOT NULL,
    classificacao INT NOT NULL,
    plano VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    localizacao VARCHAR(100) NOT NULL
);

INSERT INTO hoteis (nomeHotel, classificacao, plano, preco, localizacao) VALUES
('Hotel Copacabana Palace', 5, 'Luxo', 1200.00, 'Rio de Janeiro, RJ'),
('Pousada das Montanhas', 3, 'Econômico', 300.00, 'Campos do Jordão, SP'),
('Resort Sol Nascente', 4, 'Completo', 800.00, 'Fortaleza, CE'),
('Hotel Beira-Mar', 2, 'Simples', 150.00, 'Natal, RN'),
('Eco Lodge Floresta', 4, 'Natureza', 650.00, 'Manaus, AM');
