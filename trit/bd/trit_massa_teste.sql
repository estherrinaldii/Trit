INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('joao.silva@gmail.com', 'João Silva', md5(123), 3500.00, 120);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('maria.souza@gmail.com', 'Maria Souza', md5(123), 4200.50, 85);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('pedro.oliveira@gmail.com', 'Pedro Oliveira', md5(123), 2800.75, 0);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('ana.costa@gmail.com', 'Ana Costa', md5(123), 5100.00, 340);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('carlos.pereira@gmail.com', 'Carlos Pereira', md5(123), 3990.20, 15);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('fernanda.lima@gmail.com', 'Fernanda Lima', md5(123), 6200.00, 500);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('lucas.almeida@gmail.com', 'Lucas Almeida', md5(123), 1800.00, 0);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('juliana.rocha@gmail.com', 'Juliana Rocha', md5(123), 4750.30, 210);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('rafael.santos@gmail.com', 'Rafael Santos', md5(123), 2950.00, 60);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('patricia.gomes@gmail.com', 'Patrícia Gomes', md5(123), 3300.90, 95);
INSERT INTO Usuario (nm_email, nm_usuario, nm_senha, vl_renda, qt_pontos) VALUES ('sabrina.carpinteira@gmail.com', 'Sabrina Carpinteira', md5('123'), 1400.00, 0);

INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (1, 'Alimentação', 'ana.costa@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (2, 'Moradia', 'carlos.pereira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (3, 'Moradia', 'sabrina.carpinteira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (4, 'Saúde', 'joao.silva@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (5, 'Fitness e esportes', 'juliana.rocha@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (6, 'Vestuário', 'lucas.almeida@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (7, 'Beleza e cuidados pessoais', 'maria.souza@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (8, 'Jogos', 'patricia.gomes@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (9, 'Entretenimento', 'pedro.oliveira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (10, 'Hobbies', 'rafael.santos@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (11, 'Educação', 'ana.costa@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (12, 'Trabalho', 'carlos.pereira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (13, 'Tecnologia', 'fernanda.lima@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (14, 'Assinaturas', 'joao.silva@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (15, 'Compras', 'juliana.rocha@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (16, 'Supermercado', 'lucas.almeida@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (17, 'Casa e decoração', 'maria.souza@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (18, 'Manutenção', 'patricia.gomes@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (19, 'Utilidades', 'pedro.oliveira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email) VALUES (20, 'Pets', 'rafael.santos@gmail.com');

INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES (1, 1400.00, 'sabrina.carpinteira@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(2, 2500.50, 'maria.souza@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(3, 800.00, 'pedro.oliveira@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(4, 3400.75, 'ana.costa@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(5, 1200.00, 'joao.silva@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(6, 950.20, 'carlos.pereira@gmail.com');

INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, FK_cd_carteira, FK_cd_categoria_gasto) VALUES
(1, 'Aluguel Agosto', 1500.00, '2026-08-05 09:00:00', '2026-08-10 00:00:00', 'fixa', 'finalizada', 1, 2),
(2, 'Supermercado semanal', 320.75, '2026-08-08 18:30:00', NULL, 'controlada', 'finalizada', 1, 16),
(3, 'Parcela notebook 3/10', 250.00, '2026-08-01 10:00:00', '2026-08-15 00:00:00', 'parcelada', 'pendente', 2, 13),
(4, 'Plano de saúde', 480.00, '2026-08-03 08:00:00', '2026-08-05 00:00:00', 'fixa', 'finalizada', 2, 4),
(5, 'Uber para o trabalho', 45.90, '2026-08-09 07:45:00', NULL, 'controlada', 'finalizada', 3, 3),
(6, 'Academia mensalidade', 99.90, '2026-08-02 12:00:00', '2026-08-10 00:00:00', 'fixa', 'pendente', 3, 5),
(7, 'Assinatura streaming', 39.90, '2026-08-06 20:00:00', '2026-08-06 00:00:00', 'fixa', 'finalizada', 4, 14),
(8, 'Roupas inverno', 210.00, '2026-08-04 16:20:00', NULL, 'controlada', 'finalizada', 4, 6),
(9, 'Ração e petiscos', 89.50, '2026-08-07 11:10:00', NULL, 'controlada', 'finalizada', 5, 20),
(10, 'Parcela celular 6/12', 180.00, '2026-08-01 09:30:00', '2026-08-20 00:00:00', 'parcelada', 'pendente', 5, 13);