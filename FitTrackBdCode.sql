CREATE DATABASE FitTrack_BD

USE FitTrack_BD

CREATE TABLE Alimento
(
    id_alimento UNIQUEIDENTIFIER NOT NULL ,
    nome_alimento VARCHAR (100) NOT NULL ,
    calorias INTEGER NOT NULL ,
    proteinas DECIMAL (5,2) ,
    carboidratos DECIMAL (5,2) ,
    gorduras DECIMAL (5,2) ,
    Dieta_id_dieta UNIQUEIDENTIFIER NOT NULL
)
GO

ALTER TABLE Alimento ADD CONSTRAINT Alimento_PK PRIMARY KEY CLUSTERED (id_alimento)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Dieta
(
    id_dieta UNIQUEIDENTIFIER NOT NULL ,
    nome_dieta VARCHAR (100) NOT NULL ,
    descricao TEXT ,
    objetivo VARCHAR (15) NOT NULL ,
    data_criacao DATE NOT NULL ,
    Usuario_id_usuario UNIQUEIDENTIFIER NOT NULL
)
GO

CREATE TABLE DietaAlimento
(
ID UNIQUEIDENTIFIER NOT NULL,
id_dieta UNIQUEIDENTIFIER NOT NULL,
id_alimento UNIQUEIDENTIFIER NOT NULL,
)

ALTER TABLE Dieta ADD CONSTRAINT Dieta_PK PRIMARY KEY CLUSTERED (id_dieta)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Exercicio
(
    id_exercicio UNIQUEIDENTIFIER NOT NULL ,
    nome_exercicio VARCHAR (100) NOT NULL ,
    descricao TEXT ,
    grupo_muscular VARCHAR (50) NOT NULL ,
    video_execucao INTEGER ,
    Media_id_media UNIQUEIDENTIFIER NOT NULL ,
    repeticoes INTEGER NOT NULL ,
    carga DECIMAL (5,2) NOT NULL ,
    series INTEGER NOT NULL ,
    Treino_id_treino UNIQUEIDENTIFIER NOT NULL
)
GO




CREATE UNIQUE NONCLUSTERED INDEX 
    Exercicio__IDX ON Exercicio 
    ( 
     Media_id_media 
    ) 
GO

ALTER TABLE Exercicio ADD CONSTRAINT Exercicio_PK PRIMARY KEY CLUSTERED (id_exercicio)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Media
(
    id_media UNIQUEIDENTIFIER NOT NULL ,
    uri VARCHAR (255) NOT NULL ,
    blob_name VARCHAR (100) NOT NULL
)
GO

ALTER TABLE Media ADD CONSTRAINT Media_PK PRIMARY KEY CLUSTERED (id_media)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Treino
(
    id_treino UNIQUEIDENTIFIER NOT NULL ,
    nome_treino VARCHAR (100) NOT NULL ,
    descricao TEXT NOT NULL ,
    nivel_dificuldade VARCHAR (15) NOT NULL ,
    data_criacao DATE NOT NULL ,
    objetivo VARCHAR (15) NOT NULL ,
    Usuario_id_usuario UNIQUEIDENTIFIER NOT NULL
)
GO

ALTER TABLE Treino ADD CONSTRAINT Treino_PK PRIMARY KEY CLUSTERED (id_treino)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE Usuario
(
    id_usuario UNIQUEIDENTIFIER NOT NULL ,
    nome VARCHAR (100) NOT NULL ,
    email VARCHAR (100) NOT NULL ,
    senha VARCHAR (255) ,
    -- data_nascimento DATE ,
    sexo CHAR (1) NULL ,
    peso DECIMAL (5,2) NULL ,
    altura DECIMAL (4,2) NULL ,
    google_id_account VARCHAR (255) ,
    status VARCHAR (15) ,
    codigo_recuperacao_senha int NULL ,
	foto text NOT NULL,
	blobNameFoto text NULL
)
GO




CREATE UNIQUE NONCLUSTERED INDEX 
    Usuario__IDX ON Usuario 
    ( 
     Media_id_media 
    ) 
GO

ALTER TABLE Usuario ADD CONSTRAINT Usuario_PK PRIMARY KEY CLUSTERED (id_usuario)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

ALTER TABLE Alimento 
    ADD CONSTRAINT Alimento_Dieta_FK FOREIGN KEY 
    ( 
     Dieta_id_dieta
    ) 
    REFERENCES Dieta 
    ( 
     id_dieta 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Dieta 
    ADD CONSTRAINT Dieta_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_id_usuario
    ) 
    REFERENCES Usuario 
    ( 
     id_usuario 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Exercicio 
    ADD CONSTRAINT Exercicio_Media_FK FOREIGN KEY 
    ( 
     Media_id_media
    ) 
    REFERENCES Media 
    ( 
     id_media 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Exercicio 
    ADD CONSTRAINT Exercicio_Treino_FK FOREIGN KEY 
    ( 
     Treino_id_treino
    ) 
    REFERENCES Treino 
    ( 
     id_treino 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Treino 
    ADD CONSTRAINT Treino_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_id_usuario
    ) 
    REFERENCES Usuario 
    ( 
     id_usuario 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE Usuario 
    ADD CONSTRAINT Usuario_Media_FK FOREIGN KEY 
    ( 
     Media_id_media
    ) 
    REFERENCES Media 
    ( 
     id_media 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO