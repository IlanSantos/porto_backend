CREATE TABLE cliente(codigo SERIAL PRIMARY KEY NOT NULL, nome VARCHAR(55) NOT NULL);
INSERT INTO cliente(nome) VALUES ('HOTDOG-SUD'), ('MAESTRO');

CREATE TABLE conteiner(codigo SERIAL PRIMARY KEY NOT NULL, cd_cliente INT NOT NULL REFERENCES cliente(codigo),
					   numero VARCHAR(11) NOT NULL,
					   tipo INT NOT NULL,
					   categoria VARCHAR(1) NOT NULL,
					   situacao VARCHAR(1) NOT NULL DEFAULT 'V'
					  );



CREATE TABLE tp_movimentacao(codigo SERIAL PRIMARY KEY NOT NULL, nome VARCHAR(55) NOT NULL);
INSERT INTO tp_movimentacao(nome) VALUES ('embarque'), ('desembarque'), ('gate in'), ('gate out'), ('reposicionamento'), ('pesagem'), ('scanner');

CREATE TABLE movimentacao(codigo SERIAL PRIMARY KEY NOT NULL, tp_movimentacao INT NOT NULL REFERENCES tp_movimentacao(codigo),
						  cd_conteiner INT NOT NULL REFERENCES conteiner(codigo), dt_inicio TIMESTAMP NOT NULL, dt_fim TIMESTAMP NOT NULL
						 );
						 
