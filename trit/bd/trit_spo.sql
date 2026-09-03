	delimiter $$
	DROP PROCEDURE IF EXISTS acessar$$
	CREATE PROCEDURE acessar(pEmail VARCHAR(200), pSenha VARCHAR(200))
	begin
		declare qtd int default 0;
		SELECT count(*) into qtd from Usuario where nm_email = pEmail and nm_senha = md5(pSenha);
		if(qtd = 0) then
			signal sqlstate '45000' set message_text = 'Login e/ou senha invalidos';
		else
			SELECT nm_email, nm_usuario FROM Usuario
			where nm_email = pEmail
			and nm_senha = md5(pSenha);
		end if;
	end$$

	DROP PROCEDURE IF EXISTS listar_categorias$$
	CREATE PROCEDURE listar_categorias(pEmail VARCHAR(200))
	begin
		declare qtdUsuario int default 0;
		
		SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
		
		select cd_categoria_gasto, nm_categoria_gasto from categoria_gasto 
			where FK_nm_email = pEmail;    
	end$$

	DROP PROCEDURE IF EXISTS selecionar_categoria$$
	CREATE PROCEDURE selecionar_categoria(pNomeCategoria varchar(100), pEmail varchar(200))
	begin
		declare qtdUsuario int default 0;
		DECLARE maiorCodigo INT DEFAULT 0;
		DECLARE pCodigoCategoria INT DEFAULT 0;
		DECLARE qtdCategoriaComEsseNome INT DEFAULT 0; 

		SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;    
		
		SELECT COUNT(*) INTO qtdCategoriaComEsseNome FROM Categoria_Gasto WHERE nm_categoria_gasto = pNomeCategoria AND FK_nm_email = pEmail; 
			IF qtdCategoriaComEsseNome > 0 THEN 
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuário já possui essa categoria';
			END IF;
			
				IF pNomeCategoria NOT IN (
			'Alimentação',
			'Moradia',
			'Transporte',
			'Saúde',
			'Fitness e esportes',
			'Vestuário',
			'Beleza e cuidados pessoais',
			'Jogos',
			'Entretenimento',
			'Hobbies',
			'Educação',
			'Trabalho',
			'Tecnologia',
			'Assinaturas',
			'Compras',
			'Supermercado',
			'Casa e decoração',
			'Manutenção',
			'Utilidades',
			'Pets'
		) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria fixa inválida';
		END IF;
			
			SELECT IFNULL(MAX(cd_categoria_gasto), 0) INTO maiorCodigo FROM categoria_gasto;
			SET pCodigoCategoria = maiorCodigo + 1;
			
			INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email, ic_tipo_categoria) 
			VALUES (pCodigoCategoria, pNomeCategoria, pEmail, 'fixa');
		
	end$$

	DROP PROCEDURE IF EXISTS criar_categoria$$
	CREATE PROCEDURE criar_categoria(pNomeCategoria varchar(100), pEmail varchar(200))
	begin
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE pCodigoCategoria INT DEFAULT 0;
		DECLARE maiorCodigo INT DEFAULT 0;
		DECLARE qtdCategoriaComEsseNome INT DEFAULT 0; 
		
		SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF; 
		
			SELECT IFNULL(MAX(cd_categoria_gasto), 0) INTO maiorCodigo FROM categoria_gasto;
				SET pCodigoCategoria = maiorCodigo + 1;
			
			SELECT COUNT(*) INTO qtdCategoriaComEsseNome FROM Categoria_Gasto WHERE LOWER(nm_categoria_gasto) = LOWER(pNomeCategoria) AND FK_nm_email = pEmail; 
			IF qtdCategoriaComEsseNome > 0 THEN 
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuário já possui essa categoria';
			END IF;
			
			INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, FK_nm_email, ic_tipo_categoria) VALUES(pCodigoCategoria, pNomeCategoria, pEmail, 'personalizada');    
	end$$
	   
	DROP PROCEDURE IF EXISTS editar_categoria$$
	CREATE PROCEDURE editar_categoria (pEmail VARCHAR(200), pCodigoCategoria INT, pNovoNome VARCHAR(100))
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE qtdCategoria INT DEFAULT 0;

			SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
				IF qtdUsuario = 0 THEN
					SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
			END IF; 
			
		SELECT COUNT(*) INTO qtdCategoria 
		FROM categoria_gasto 
		WHERE cd_categoria_gasto = pCodigoCategoria AND FK_nm_email = pEmail;

		IF qtdCategoria = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria não encontrada';
		END IF;

		UPDATE categoria_gasto 
		SET nm_categoria_gasto = pNovoNome 
		WHERE cd_categoria_gasto = pCodigoCategoria AND FK_nm_email = pEmail;
	END$$


delimiter ;