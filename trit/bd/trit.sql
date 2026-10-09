DROP SCHEMA IF EXISTS Trit ;
CREATE SCHEMA Trit;
USE Trit ;

CREATE TABLE Usuario (
  nm_email VARCHAR(200) NOT NULL,
  nm_usuario VARCHAR(100) NOT NULL,
  nm_senha VARCHAR(100) NOT NULL,
  vl_renda DECIMAL(10,2) NOT NULL,
  qt_pontos INT NOT NULL DEFAULT 0,
  CONSTRAINT PK_Usuario PRIMARY KEY (nm_email)
);

CREATE TABLE Recuperacao(
	cd_recuperacao INT NOT NULL,
	FK_nm_email VARCHAR(200) NOT NULL,
	CONSTRAINT PK_Recuperacao PRIMARY KEY (cd_recuperacao),
	CONSTRAINT FK_Recuperacao_Usuario
	FOREIGN KEY(FK_nm_email)
	REFERENCES Usuario(nm_email)
);

CREATE TABLE Carteira (
  cd_carteira INT NOT NULL,
  vl_carteira DECIMAL(10,2) NULL,
  FK_nm_email VARCHAR(200) NOT NULL,
  CONSTRAINT PK_Carteira PRIMARY KEY (cd_carteira, FK_nm_email),
  CONSTRAINT FK_Carteira_Usuario
    FOREIGN KEY (FK_nm_email)
    REFERENCES Usuario (nm_email)
);

CREATE TABLE Entrada (
  cd_entrada INT NOT NULL,
   nm_entrada VARCHAR(100) NULL,
  vl_entrada DECIMAL(10,2) NOT NULL,
  dt_entrada DATE NOT NULL,
  FK_cd_carteira INT NOT NULL,
  CONSTRAINT PK_Entrada PRIMARY KEY (cd_entrada, FK_cd_carteira),
  CONSTRAINT FK_Entrada_Carteira
    FOREIGN KEY (FK_cd_carteira)
    REFERENCES Carteira (cd_carteira)
);

CREATE TABLE Categoria_Gasto (
  cd_categoria_gasto INT NOT NULL,
  nm_categoria_gasto VARCHAR(100) NOT NULL,
  vl_limite DECIMAL(10,2) NOT NULL,
  FK_nm_email VARCHAR(200) NOT NULL,
  ic_tipo_categoria enum('nativa', 'personalizada') NOT NULL DEFAULT 'nativa',
  CONSTRAINT PK_categoria_gasto PRIMARY KEY (cd_categoria_gasto),
  CONSTRAINT FK_Categoria_Gasto_Usuario
  FOREIGN KEY (FK_nm_email)
  REFERENCES Usuario(nm_email)
);

CREATE TABLE Planta (
  cd_planta INT NOT NULL,
  nm_planta VARCHAR(100) NOT NULL,
  CONSTRAINT PK_Planta PRIMARY KEY (cd_planta)
);

CREATE TABLE Cofrinho (
  cd_cofrinho INT NOT NULL,
  nm_cofrinho VARCHAR(100) NOT NULL,
  dt_cofrinho DATETIME NOT NULL,
  dt_prazo DATE NULL,
  vl_cofrinho_final DECIMAL(10,2) NOT NULL,
  ic_tipo_cofrinho ENUM('determinado', 'indeterminado') NOT NULL,
  vl_cofrinho_atual DECIMAL(10,2) NOT NULL,
  qt_pontos INT NOT NULL,
  FK_nm_email VARCHAR(200) NOT NULL,
  FK_cd_planta INT NOT NULL,
  CONSTRAINT PK_Cofrinho PRIMARY KEY (cd_cofrinho, FK_nm_email),
  CONSTRAINT FK_Cofrinho_Usuario
    FOREIGN KEY (FK_nm_email)
    REFERENCES Usuario (nm_email),
  CONSTRAINT FK_Cofrinho_Planta
    FOREIGN KEY (FK_cd_planta)
    REFERENCES Planta (cd_planta)
);

CREATE TABLE Insignia (
  cd_insignia INT NOT NULL,
  nm_insignia VARCHAR(100) NOT NULL,
  nm_tipo_insignia VARCHAR(100) NOT NULL,
  img_insignia BLOB NOT NULL,
  CONSTRAINT PK_Insignia PRIMARY KEY (cd_insignia)
  );
  
CREATE TABLE Usuario_Insignia (
  FK_nm_email VARCHAR(200) NOT NULL,
  FK_cd_insignia INT NOT NULL,
  CONSTRAINT PK_Usuario_Insignia PRIMARY KEY (FK_nm_email, FK_cd_insignia),
  CONSTRAINT FK_Usuario_Insignia_Usuario
    FOREIGN KEY (FK_nm_email)
    REFERENCES Usuario (nm_email),
  CONSTRAINT FK_Usuario_Insignia_Insignia
    FOREIGN KEY (FK_cd_insignia)
    REFERENCES Insignia (cd_insignia)
);

CREATE TABLE  Saida (
  cd_saida INT NOT NULL,
  nm_saida VARCHAR(100) NOT NULL,
  vl_saida DECIMAL(10,2) NOT NULL,
  dt_saida DATE NOT NULL,
  dt_prazo_saida DATE NULL,
  ic_tipo_saida ENUM('fixa', 'parcelada', 'categorizada') NOT NULL,
  ic_status_saida ENUM('pendente', 'finalizada') NULL,
  qt_parcelas INT NULL,
  FK_cd_carteira INT NOT NULL,
  FK_cd_categoria_gasto INT DEFAULT NULL,
  CONSTRAINT PK_Saida PRIMARY KEY (cd_saida, FK_cd_carteira),
  CONSTRAINT FK_Saida_Carteira
    FOREIGN KEY (FK_cd_carteira)
    REFERENCES Carteira (cd_carteira),
  CONSTRAINT FK_Saida_categoria_gasto
    FOREIGN KEY (FK_cd_categoria_gasto)
    REFERENCES categoria_gasto (cd_categoria_gasto)
);

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

INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (1, 'Alimentação', 800.00, 'ana.costa@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (2, 'Moradia', 1500.00, 'carlos.pereira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (3, 'Moradia', 1200.00, 'sabrina.carpinteira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (4, 'Saúde', 400.00, 'joao.silva@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (5, 'Fitness e esportes', 300.00, 'juliana.rocha@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (6, 'Vestuário', 450.00, 'lucas.almeida@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (7, 'Beleza e cuidados pessoais', 250.00, 'maria.souza@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (8, 'Jogos', 200.00, 'patricia.gomes@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (9, 'Entretenimento', 350.00, 'pedro.oliveira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (10, 'Hobbies', 300.00, 'rafael.santos@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (11, 'Educação', 600.00, 'ana.costa@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (12, 'Trabalho', 400.00, 'carlos.pereira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (13, 'Tecnologia', 1000.00, 'fernanda.lima@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (14, 'Assinaturas', 150.00, 'joao.silva@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (15, 'Compras', 700.00, 'juliana.rocha@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (16, 'Supermercado', 900.00, 'lucas.almeida@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (17, 'Casa e decoração', 500.00, 'maria.souza@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (18, 'Manutenção', 450.00, 'patricia.gomes@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (19, 'Utilidades', 350.00, 'pedro.oliveira@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (20, 'Pets', 400.00, 'rafael.santos@gmail.com');
INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email) VALUES (21, 'Alimentação', 50.00, 'sabrina.carpinteira@gmail.com');


INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES (1, 1400.00, 'sabrina.carpinteira@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(2, 2500.50, 'maria.souza@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(3, 800.00, 'pedro.oliveira@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(4, 3400.75, 'ana.costa@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(5, 1200.00, 'joao.silva@gmail.com');
INSERT INTO carteira (cd_carteira, vl_carteira, FK_nm_email) VALUES(6, 950.20, 'carlos.pereira@gmail.com');

INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (1, 'Aluguel Agosto', 1500.00, '2026-08-05', '2026-08-10', 'fixa', 'finalizada', NULL, 1, null);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (2, 'Supermercado semanal', 320.75, '2026-08-08', NULL, 'categorizada', 'finalizada', NULL, 1, 16);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (3, 'Parcela notebook 3/10', 250.00, '2026-08-01', '2026-08-15', 'parcelada', 'pendente', 10, 2, null);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (4, 'Plano de saúde', 480.00, '2026-08-03', '2026-08-05', 'fixa', 'finalizada', NULL, 2, null);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (5, 'Uber para o trabalho', 45.90, '2026-08-09', NULL, 'categorizada', 'finalizada', NULL, 3, 3);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (6, 'Academia mensalidade', 99.90, '2026-08-02', '2026-08-10', 'fixa', 'pendente', NULL, 3, null);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (7, 'Assinatura streaming', 39.90, '2026-08-06', '2026-08-06', 'fixa', 'finalizada', NULL, 4, null);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (8, 'Roupas inverno', 210.00, '2026-08-04', NULL, 'categorizada', 'finalizada', NULL, 4, 6);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (9, 'Ração e petiscos', 89.50, '2026-08-07', NULL, 'categorizada', 'finalizada', NULL, 5, 20);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (10, 'Parcela celular 6/12', 180.00, '2026-08-01', '2026-08-20', 'parcelada', 'pendente', 12, 5, null);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (11, 'Parcela do aluguel', 900, '2026-08-08', NULL, 'categorizada', 'finalizada', NULL, 1, 3);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (12, 'Compra da feira', 10, '2026-08-08', NULL, 'categorizada', 'finalizada', NULL, 1, 21);
INSERT INTO Saida (cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto) VALUES (13, 'Banana', 1, '2026-08-08', NULL, 'categorizada', 'finalizada', NULL, 1, 21);