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
  dt_entrada TIMESTAMP NOT NULL,
  FK_cd_carteira INT NOT NULL,
  CONSTRAINT PK_Entrada PRIMARY KEY (cd_entrada, FK_cd_carteira),
  CONSTRAINT FK_Entrada_Carteira
    FOREIGN KEY (FK_cd_carteira)
    REFERENCES Carteira (cd_carteira)
);

CREATE TABLE Categoria_Gasto (
  cd_categoria_gasto INT NOT NULL,
  nm_categoria_gasto VARCHAR(100) NOT NULL,
  FK_nm_email VARCHAR(200) NOT NULL,
  ic_tipo_categoria enum('fixa', 'personalizada') NOT NULL DEFAULT 'fixa',
  CONSTRAINT PK_categoria_gasto PRIMARY KEY (cd_categoria_gasto),
  CONSTRAINT FK_Categoria_Gasto_Usuario
  FOREIGN KEY (FK_nm_email)
  REFERENCES Usuario(nm_email)
);

CREATE TABLE Planta (
  cd_planta INT NOT NULL,
  nm_planta VARCHAR(100) NOT NULL,
  img_fase1 BLOB NULL,
  img_fase2 BLOB NULL,
  img_fase3 BLOB NULL,
  img_fase4 BLOB NULL,
  img_fase5 BLOB NULL,
  ic_fase_atual ENUM('fase 1', 'fase 2', 'fase 3', 'fase 4', 'fase 5') NULL,
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
  dt_saida TIMESTAMP NOT NULL,
  dt_prazo_saida DATETIME NULL,
  ic_tipo_saida ENUM('fixa', 'parcelada', 'categorizada') NOT NULL,
  ic_status_saida ENUM('pendente', 'finalizada') NULL,
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