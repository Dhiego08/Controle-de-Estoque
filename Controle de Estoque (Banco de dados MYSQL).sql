CREATE DATABASE  Controle_Estoque;

use  Controle_Estoque;

-- DROP DATABASE Controle_Estoque;

-- Drop das tabelas se já existirem
DROP TABLE IF EXISTS telefone;
DROP TABLE IF EXISTS Tipo_Usuario;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Fornecedores;
DROP TABLE IF EXISTS Estoque;
drop table if exists Movimentacao;
drop table if exists Faturamento;

-- Criação das tabelas
create table Usuario(
	id_usuario 				int(20) AUTO_INCREMENT PRIMARY KEY not null,
	nome_usuario 			varchar(50)								   ,
	tipo_usuario 			char(50)								   ,
	status_usuario 			char(50)
);


CREATE TABLE Tipo_Usuario (
    id_tipo_usuario     INT(20)  AUTO_INCREMENT PRIMARY KEY NOT NULL,
    desc_tipo_usuario   VARCHAR(50)									,
    nivel_tipo_usuario  INT(20)
);

CREATE TABLE telefone (
    id_telefone        INT(20)    AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_usuario         INT(20)										 ,
    numero_telefone    VARCHAR(250)									 ,
    
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Fornecedores (
    id_produto 				INT(20) 		AUTO_INCREMENT PRIMARY KEY				,
    data_entrada 			DATETIME NOT NULL										,
    codi_produto 			CHAR(50) NOT NULL										,
    descricao_fornecedor 	VARCHAR(50) NOT NULL									,
    cnpj_fornecedor 		char(15) NOT NULL										,
    Telefone_fornecedor 	char(25)												,
    descricao_produto 		char(50) NOT NULL										,
	estilo_produto			varchar(25)												,
    valor_nf				DECIMAL(10,2)											,												
    qtd_entrada 			INT(15)													
);
ALTER TABLE Fornecedores MODIFY COLUMN data_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


alter table Fornecedores modify column Telefone_fornecedor char(25);

alter table Fornecedores modify column valor_nf char(50);

ALTER TABLE Fornecedores MODIFY column valor_nf char(25);

alter table Fornecedores drop column preco_venda;

alter table Fornecedores add column preco_venda char (20);

alter table Fornecedores add column estilo_produto varchar (25);

alter table Fornecedores change  estilo_produt estilo_produto  char(50);
 
alter table Fornecedores change preco_compra valor_nf char (50);
 
alter table Fornecedores change estilo_produto qtd_entrada int(25); 

alter table Fornecedores change  preco_custo preco_compra  char(50);
 
create table Estoque (
    id_movimentacao         int(25)     not null auto_increment primary key          ,
    data_entrada            DATETIME NOT NULL        		 						 ,
    codi_produto            char(50)    not null									 ,
    produto                 char(60)    not null									 ,
    localizacao_estoque     char(50)												 ,
    qtd_entrada             int(20)     not null									 ,
    qtd_saida               int(20)     									         ,
    total_estoque           int(25)     not null									 
    
);
ALTER TABLE Estoque MODIFY COLUMN data_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- unique key unique_codi_produto (codi_produto)
-- Essa linha cria um índice único chamado unique_codi_produto na coluna codi_produto. 
-- Um índice único garante que cada valor na coluna especificada (neste caso, codi_produto) seja único em toda a tabela. 
-- Se você tentar inserir um novo registro com um valor de codi_produto que já existe na tabela, você receberá um erro de violação de chave única.

alter table Estoque add column id_estoque int(20);

create table Movimentacao (
	id_movimentacao			int(20) 			auto_increment primary key			,
    data_entrada			DATETIME NOT NULL										,
    codi_produto			char(50)			not null							,
    produto					char(50)			not null							,
    estilo_produto			varchar(25)												,
    custo_compra			DECIMAL(10,2)											,
    preco_compra			DECIMAL(10,2)											,
    preco_venda			    char(25)												,	
    tipo_saida				char(25)												,
    preco_lucro				char(25)
);
ALTER TABLE Movimentacao MODIFY COLUMN data_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

alter table Movimentacao drop column qtd_venda;

alter table Movimentacao modify column estilo_produto varchar(25);

ALTER TABLE Movimentacao modify column custo_compra  DECIMAL(10,2);
SELECT * FROM Movimentacao WHERE custo_compra LIKE '%,%';
UPDATE Movimentacao SET custo_compra = REPLACE(custo_compra, ',', '.');

alter table Movimentacao modify column custo_compra DECIMAL(10,2);

alter table Movimentacao modify column preco_compra DECIMAL(10,2);

alter table Movimentacao modify column custo_compra char(50);

alter table Movimentacao modify column preco_compra char(50);

alter table Movimentacao drop column qtd_venda;

alter table Movimentacao change preco_lucro qtd_venda char(25);

alter table Movimentacao add column preco_lucro char(25);

 ALTER TABLE Movimentacao DROP COLUMN custo_compra;
 
alter table Fornecedores modify column descricao_produto char(50);

alter table Movimentacao modify column estilo_produto varchar(25);

alter table Movimentacao add column qtd_venda char (25);

alter table Movimentacao change qtd_venda tipo_saida char(25);

alter table Estoque drop column preco_venda;

alter table Estoque drop column preco_custo;

alter table Estoque drop column custo_compra;

alter table Estoque drop column preco_lucro;

ALTER TABLE Estoque change localização_estqoue localizacao_estoque CHAR(50);

alter table Estoque add column preco_venda char (25);

alter table Estoque add column preco_custo char (25);

alter table Estoque add column custo_compra char (25);

alter table Estoque add column preco_lucro char (25);

-- Permitindo valores nulos para qtd_saida
ALTER TABLE Estoque MODIFY COLUMN qtd_saida INT(20) NULL; 

create table Faturamento(
	id_movimentacao		int(25)		not null auto_increment primary key		,
    data_entrada		DATETIME NOT NULL									,
    codi_produto		char(25)											,	
    produto				char(25)											,
    valor_venda			char(25)											,
	qtd_venda			int(25)												,
    tipo_venda			char(40)					
);

-- Adicionando a chave estrangeira na tabela Estoque
ALTER TABLE Estoque
ADD CONSTRAINT fk_codi_produto
FOREIGN KEY (codi_produto) REFERENCES Fornecedores(codi_produto);

ALTER TABLE Estoque DROP FOREIGN KEY fk_codi_produto;

ALTER TABLE Fornecedores MODIFY COLUMN Telefone_fornecedor CHAR(20);

ALTER TABLE Fornecedores MODIFY COLUMN cnpj_fornecedor CHAR(20);

ALTER TABLE Usuario DROP FOREIGN KEY FK_TipoUsuario;

ALTER TABLE Usuario DROP COLUMN id_tipo_usuario;

ALTER TABLE Fornecedores MODIFY COLUMN cnpj_fornecedor char(20);

ALTER TABLE Fornecedores MODIFY COLUMN Telefone_fornecedor char(20);

ALTER TABLE Usuario ADD COLUMN id_tipo_usuario INT(20);

-- Adicione a restrição de chave estrangeira novamente
ALTER TABLE Usuario
ADD CONSTRAINT FK_TipoUsuario FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario);

-- Adicionar a restrição de chave estrangeira
ALTER TABLE Usuario
ADD CONSTRAINT FK_TipoUsuario FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario);

-- Verificação dos dados
SELECT * FROM Usuario;

SELECT * FROM Tipo_Usuario;

SELECT * FROM telefone;

SELECT * FROM Fornecedores;

SELECT * FROM Estoque;

select * from Movimentacao;

alter table Usuario
add column id_tipo_usuario int(20);

alter table telefone
add column id_usuario int(20);


insert into Tipo_Usuario (id_tipo_usuario, desc_tipo_usuario, nivel_tipo_usuario)
values (null, 'Super Usuario', 10), (null, 'Administrador', 5), (null, 'Colaborador', 1);

DELETE FROM telefone WHERE id_usuario IN (SELECT id_usuario FROM Usuario);

DELETE FROM Usuario;

ALTER TABLE telefone
DROP COLUMN ddd_telefone;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM Usuario WHERE 1 = 1;






