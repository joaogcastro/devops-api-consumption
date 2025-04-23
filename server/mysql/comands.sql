use voos;

CREATE TABLE flights (
    id INT PRIMARY KEY,
    origem VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    companhia VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

INSERT INTO flights (id, origem, destino, companhia, preco) VALUES
(1, 'São Paulo', 'Rio de Janeiro', 'Latam', 200.00),
(2, 'Belo Horizonte', 'Salvador', 'Latam', 250.00),
(3, 'Curitiba', 'Florianópolis', 'Latam', 150.00),
(4, 'Porto Alegre', 'São Paulo', 'Latam', 300.00),
(5, 'Rio de Janeiro', 'Brasília', 'Latam', 280.00),
(6, 'Fortaleza', 'Recife', 'Latam', 180.00),
(7, 'Salvador', 'São Paulo', 'Latam', 220.00),
(8, 'Manaus', 'Belém', 'Latam', 160.00),
(9, 'Natal', 'João Pessoa', 'Latam', 140.00),
(10, 'Goiânia', 'Cuiabá', 'Latam', 210.00);