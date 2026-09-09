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
    
    DROP PROCEDURE IF EXISTS criar_saida$$
    CREATE PROCEDURE criar_saida(pEmail VARCHAR(200), pNomeSaida varchar(100), pValor decimal(10,2), pPrazo datetime, pTipo enum('fixa','parcelado','controlada'), pStatus enum('pendente','finalizada'), pCategoriaGasto int)
    BEGIN
		DECLARE pCodigoSaida INT DEFAULT 0; 
        DECLARE maiorCodigo INT DEFAULT 0;
        DECLARE pCarteira INT DEFAULT 0;
        DECLARE qtdUsuario INT DEFAULT 0;
        DECLARE qtdCategoria INT DEFAULT 0;
        
        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;        
        
        SELECT IFNULL(MAX(cd_saida), 0) INTO maiorCodigo FROM saida;
				SET pCodigoSaida = maiorCodigo + 1;
                
		SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
        IF pValor <= 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
        END IF;
    
		IF pTipo = 'fixa' THEN 
		INSERT INTO saida(cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, FK_cd_carteira, FK_cd_categoria_gasto)
			VALUES (pCodigoSaida, pNomeSaida, pValor, current_timestamp, null, 'fixa', pStatus, pCarteira, null);
         END IF; 
         
         IF  pTipo = 'parcelado' THEN 
		INSERT INTO saida(cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, FK_cd_carteira, FK_cd_categoria_gasto)
			VALUES (pCodigoSaida, pNomeSaida, pValor, current_timestamp, pPrazo, 'parcelado', pStatus, pCarteira, null);
         END IF; 
         
         IF pTipo = 'controlada' THEN
			SELECT COUNT(*) INTO qtdCategoria
				FROM categoria_gasto
				WHERE cd_categoria_gasto = pCategoriaGasto AND FK_nm_email = pEmail;
			IF qtdCategoria = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria não encontrada para este usuário';
			END IF;
		END IF;
         
         UPDATE Carteira
			SET vl_carteira = vl_carteira - pValor
			WHERE cd_carteira = pCarteira;
	END$$
    
    DROP PROCEDURE IF EXISTS listar_saidas$$
    CREATE PROCEDURE listar_saidas(pEmail VARCHAR(200))
    BEGIN
		DECLARE pCarteira INT DEFAULT 0;
        
        SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
		select  
		c.cd_carteira, c.FK_nm_email,
		s.cd_saida, s.nm_saida, s.FK_cd_categoria_gasto
		from carteira c join saida s on c.cd_carteira = s.FK_cd_carteira 
		where c.cd_carteira = pCarteira; 
	END$$

delimiter ;