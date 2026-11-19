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
		
		select cd_categoria_gasto, nm_categoria_gasto, vl_limite, ic_tipo_categoria  from categoria_gasto 
			where FK_nm_email = pEmail
            order by vl_limite asc;    
	end$$

	DROP PROCEDURE IF EXISTS selecionar_categoria$$
	CREATE PROCEDURE selecionar_categoria(pNomeCategoria varchar(100), pEmail varchar(200), pValorLimite DECIMAL(10,2))
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
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria nativa inválida';
		END IF;
			
			SELECT IFNULL(MAX(cd_categoria_gasto), 0) INTO maiorCodigo FROM categoria_gasto;
			SET pCodigoCategoria = maiorCodigo + 1;
            
            IF pValorLimite <= 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
			END IF;
			
			INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email, ic_tipo_categoria) 
			VALUES (pCodigoCategoria, pNomeCategoria, pValorLimite, pEmail, 'nativa');
		
	end$$

	DROP PROCEDURE IF EXISTS criar_categoria$$
	CREATE PROCEDURE criar_categoria(pNomeCategoria varchar(100), pEmail varchar(200), pValorLimite DECIMAL(10,2))
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
			
			INSERT INTO categoria_gasto (cd_categoria_gasto, nm_categoria_gasto, vl_limite, FK_nm_email, ic_tipo_categoria) VALUES(pCodigoCategoria, pNomeCategoria, pValorLimite,pEmail, 'personalizada');    
	end$$
	   
	DROP PROCEDURE IF EXISTS editar_categoria$$
	CREATE PROCEDURE editar_categoria (pEmail VARCHAR(200), pCodigoCategoria INT, pNovoNome VARCHAR(100), pValorLimite decimal(10,2))
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
		SET nm_categoria_gasto = pNovoNome ,
        vl_limite = coalesce(pValorLimite, vl_limite)
				WHERE cd_categoria_gasto = pCodigoCategoria AND FK_nm_email = pEmail;
	END$$
    
    DROP PROCEDURE IF EXISTS deletar_categoria$$
	CREATE PROCEDURE deletar_categoria(pEmail VARCHAR(200), pCodigoCategoria int)
	BEGIN
		DECLARE qtdCategoria INT DEFAULT 0;
        
        DECLARE qtdUsuario INT DEFAULT 0;
        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
        
		SELECT COUNT(*) INTO qtdCategoria 
			FROM categoria_gasto 
			WHERE cd_categoria_gasto = pCodigoCategoria AND FK_nm_email = pEmail;
		IF qtdCategoria = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Categoria não encontrada para esse usuário';
		END IF;
        
        delete from categoria_gasto where cd_categoria_gasto = pCodigoCategoria and FK_nm_email = pEmail;
	END$$
    
    DROP PROCEDURE IF EXISTS criar_saida$$
    CREATE PROCEDURE criar_saida(pEmail VARCHAR(200), pNomeSaida varchar(100), pValor decimal(10,2), pData DATE, pPrazo date, pTipo enum('fixa','parcelada','categorizada'), pStatus enum('pendente','finalizada'), pCategoriaGasto int, pParcelas int)
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

        IF pTipo = 'parcelada' AND (pParcelas IS NULL OR pParcelas < 1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Número de parcelas inválido';
        END IF;
    
		IF pTipo = 'fixa' THEN 
		INSERT INTO saida(cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, FK_cd_carteira, FK_cd_categoria_gasto)
			VALUES (pCodigoSaida, pNomeSaida, pValor, pData, null, 'fixa', pStatus, pCarteira, null);
         END IF; 
         
         IF  pTipo = 'parcelada' THEN 
		INSERT INTO saida(cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, qt_parcelas, FK_cd_carteira, FK_cd_categoria_gasto)
			VALUES (pCodigoSaida, pNomeSaida, pValor, pData, pPrazo, 'parcelada', pStatus, pParcelas, pCarteira, null);
         END IF; 
         
         IF pTipo = 'categorizada' THEN
			SELECT COUNT(*) INTO qtdCategoria
				FROM categoria_gasto
				WHERE cd_categoria_gasto = pCategoriaGasto AND FK_nm_email = pEmail;
                
			INSERT INTO saida(cd_saida, nm_saida, vl_saida, dt_saida, dt_prazo_saida, ic_tipo_saida, ic_status_saida, FK_cd_carteira, FK_cd_categoria_gasto)
				VALUES (pCodigoSaida, pNomeSaida, pValor, pData, pPrazo, 'categorizada', pStatus, pCarteira, pCategoriaGasto);
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
			s.cd_saida, s.nm_saida, s.ic_tipo_saida, s.dt_saida, s.dt_prazo_saida, s.FK_cd_categoria_gasto, s.qt_parcelas
			from carteira c join saida s on c.cd_carteira = s.FK_cd_carteira 
			where c.cd_carteira = pCarteira; 
	END$$
    DROP PROCEDURE IF EXISTS listar_saidas_por_tipo$$
    CREATE PROCEDURE listar_saidas_por_tipo(pEmail VARCHAR(200), pTipo ENUM ('fixa','parcelada','categorizada'))
    BEGIN
		DECLARE pCarteira INT DEFAULT 0;
        
        SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
		select  
			c.cd_carteira, c.FK_nm_email,
			s.cd_saida, s.nm_saida, s.dt_saida, s.dt_prazo_saida, s.vl_saida,  s.FK_cd_categoria_gasto, s.ic_status_saida, s.qt_parcelas,
            cg.vl_limite, cg.nm_categoria_gasto
			from carteira c join saida s on c.cd_carteira = s.FK_cd_carteira
            left join categoria_gasto cg on cg.cd_categoria_gasto = s.FK_cd_categoria_gasto
            where c.cd_carteira = pCarteira and s.ic_tipo_saida = pTipo; 
	END$$
    
    DROP PROCEDURE IF EXISTS calcularValorGastoCategoria$$
	CREATE PROCEDURE calcularValorGastoCategoria(pEmail VARCHAR(200), pCategoria int)
	BEGIN
		DECLARE pCarteira INT DEFAULT 0;
        SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
		select  				
			sum(s.vl_saida) AS total
			from carteira c join saida s on c.cd_carteira = s.FK_cd_carteira 
			where c.cd_carteira = pCarteira and s.FK_cd_categoria_gasto = pCategoria; 
	END$$
    
    DROP PROCEDURE IF EXISTS criar_entrada$$
    CREATE PROCEDURE criar_entrada(pEmail VARCHAR(200), pNomeEntrada varchar(100), pValor decimal(10,2), pData DATE)
    BEGIN
		DECLARE pCodigoEntrada INT DEFAULT 0; 
        DECLARE maiorCodigo INT DEFAULT 0;
        DECLARE pCarteira INT DEFAULT 0;
        DECLARE qtdUsuario INT DEFAULT 0;
        DECLARE qtdCategoria INT DEFAULT 0;
        
        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;        
        
        SELECT IFNULL(MAX(cd_entrada), 0) INTO maiorCodigo FROM entrada;
				SET pCodigoEntrada = maiorCodigo + 1;
                
		SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
        IF pValor <= 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
        END IF;
        
        INSERT INTO entrada(cd_entrada, nm_entrada, vl_entrada, dt_entrada, FK_cd_carteira)
				VALUES (pCodigoEntrada,  pNomeEntrada, pValor, pData, pCarteira);
          
         UPDATE Carteira
			SET vl_carteira = vl_carteira + pValor
			WHERE cd_carteira = pCarteira;
	END$$
    
	DROP PROCEDURE IF EXISTS listar_entradas$$
    CREATE PROCEDURE listar_entradas(pEmail VARCHAR(200))
    BEGIN
		DECLARE pCarteira INT DEFAULT 0;
        
        SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
		select  
			c.cd_carteira, c.FK_nm_email,
			e.cd_entrada, e.nm_entrada, e.vl_entrada, e.dt_entrada
			from carteira c join entrada e on c.cd_carteira = e.FK_cd_carteira 
			where c.cd_carteira = pCarteira; 
	END$$    
    
    DROP PROCEDURE IF EXISTS buscar_dados_usuario$$
    CREATE PROCEDURE buscar_dados_usuario(pEmail varchar(200))
    BEGIN
		Select u.nm_email, u.nm_usuario, c.vl_carteira, c.cd_carteira, u.vl_renda, u.qt_pontos from usuario u
		join carteira c on (c.FK_nm_email = u.nm_email) 
		where u.nm_email = pEmail;
    END$$
    
    DROP PROCEDURE IF EXISTS listar_cofrinhos$$
	CREATE PROCEDURE listar_cofrinhos(pEmail varchar(200))
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
        
        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF; 
        
		select c.cd_cofrinho, c.nm_cofrinho, c.dt_cofrinho, c.dt_prazo, c.vl_cofrinho_final, c.ic_tipo_cofrinho, c.vl_cofrinho_atual, c.FK_nm_email, c.FK_cd_planta, p.nm_planta         
			from cofrinho c
            join planta p
            ON p.cd_planta = c.FK_cd_planta
            where c.FK_nm_email = pEmail
              and c.dt_exclusao IS NULL
              order by vl_cofrinho_atual desc;
	END$$
    
    DROP PROCEDURE IF EXISTS criar_cofrinho$$
    CREATE PROCEDURE criar_cofrinho(pEmail VARCHAR(200), pNomeCofrinho VARCHAR(100), pTipo ENUM('determinado','indeterminado'), pValorFinal DECIMAL(10,2), pPrazo DATE, pPlanta INT)
    BEGIN
        DECLARE pCodigoCofrinho INT DEFAULT 0;
        DECLARE maiorCodigo INT DEFAULT 0;
        DECLARE qtdUsuario INT DEFAULT 0;
        DECLARE qtdPlanta INT DEFAULT 0;

        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
            IF qtdUsuario = 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
        END IF;

        IF pValorFinal <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
        END IF;

        SELECT COUNT(*) INTO qtdPlanta FROM Planta WHERE cd_planta = pPlanta;
        IF qtdPlanta = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Planta não encontrada';
        END IF;

        SELECT IFNULL(MAX(cd_cofrinho), 0) INTO maiorCodigo FROM cofrinho;
        SET pCodigoCofrinho = maiorCodigo + 1;

        IF pTipo = 'determinado' THEN
            IF pPrazo IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cofrinho determinado precisa de um prazo';
            END IF;
            IF pPrazo < CURDATE() THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Prazo não pode ser uma data passada';
            END IF;

            INSERT INTO cofrinho(cd_cofrinho, nm_cofrinho, dt_cofrinho, dt_prazo, vl_cofrinho_final, ic_tipo_cofrinho, vl_cofrinho_atual, FK_nm_email, FK_cd_planta)
                VALUES (pCodigoCofrinho, pNomeCofrinho, CURDATE(), pPrazo, pValorFinal, 'determinado', 0.00, pEmail, pPlanta);
        END IF;

        IF pTipo = 'indeterminado' THEN
            INSERT INTO cofrinho(cd_cofrinho, nm_cofrinho, dt_cofrinho, dt_prazo, vl_cofrinho_final, ic_tipo_cofrinho, vl_cofrinho_atual, FK_nm_email, FK_cd_planta)
                VALUES (pCodigoCofrinho, pNomeCofrinho, CURDATE(), NULL, pValorFinal, 'indeterminado', 0.00, pEmail, pPlanta);
        END IF;
        
        CALL verificar_insignias_cofrinho(pEmail);
    END$$
    
    DROP PROCEDURE IF EXISTS editar_cofrinho$$
    CREATE PROCEDURE editar_cofrinho(pEmail VARCHAR(200), pCodigoCofrinho INT, pNovoNome VARCHAR(100), pNovoValorFinal DECIMAL(10,2), pNovoPrazo DATE, pNovaPlanta INT)
    BEGIN
        DECLARE qtdUsuario INT DEFAULT 0;
        DECLARE qtdCofrinho INT DEFAULT 0;
        DECLARE qtdPlanta INT DEFAULT 0;
        DECLARE vTipo VARCHAR(20);
        DECLARE vPrazoAtual DATE;

        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
            IF qtdUsuario = 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
        END IF;

        SELECT COUNT(*) INTO qtdCofrinho
            FROM cofrinho
            WHERE cd_cofrinho = pCodigoCofrinho
              AND FK_nm_email = pEmail
              AND dt_exclusao IS NULL;
        IF qtdCofrinho = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cofrinho não encontrado para esse usuário';
        END IF;

        IF pNovoValorFinal <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
        END IF;

        SELECT COUNT(*) INTO qtdPlanta FROM Planta WHERE cd_planta = pNovaPlanta;
        IF qtdPlanta = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Planta não encontrada';
        END IF;

        SELECT ic_tipo_cofrinho, dt_prazo INTO vTipo, vPrazoAtual
            FROM cofrinho
            WHERE cd_cofrinho = pCodigoCofrinho
              AND FK_nm_email = pEmail
              AND dt_exclusao IS NULL;

        IF vTipo = 'determinado' THEN
            IF pNovoPrazo IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cofrinho determinado precisa de um prazo';
            END IF;
            IF NOT (pNovoPrazo <=> vPrazoAtual) AND pNovoPrazo < CURDATE() THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Prazo não pode ser uma data passada';
            END IF;

            UPDATE cofrinho
                SET nm_cofrinho = pNovoNome, vl_cofrinho_final = pNovoValorFinal, dt_prazo = pNovoPrazo, FK_cd_planta = pNovaPlanta
                WHERE cd_cofrinho = pCodigoCofrinho AND FK_nm_email = pEmail;
        ELSE
            UPDATE cofrinho
                SET nm_cofrinho = pNovoNome, vl_cofrinho_final = pNovoValorFinal, FK_cd_planta = pNovaPlanta
                WHERE cd_cofrinho = pCodigoCofrinho AND FK_nm_email = pEmail;
        END IF;
        CALL verificar_insignias_cofrinho(pEmail);
        CALL `trit`.`verificar_desafios`(pEmail);
    END$$

	DROP PROCEDURE IF EXISTS deletar_cofrinho$$
	CREATE PROCEDURE deletar_cofrinho(pEmail VARCHAR(200), pCodigoCofrinho INT)
	BEGIN
		DECLARE pCarteira INT DEFAULT 0;
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE qtdCofrinho INT DEFAULT 0;
		DECLARE vValorAtual DECIMAL(10,2) DEFAULT 0;

		SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
		
		SELECT COUNT(*) INTO qtdCofrinho
			FROM cofrinho
			WHERE cd_cofrinho = pCodigoCofrinho
			  AND FK_nm_email = pEmail
			  AND dt_exclusao IS NULL;
		IF qtdCofrinho = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cofrinho não encontrado para esse usuário';
		END IF;

		SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;

		SELECT vl_cofrinho_atual INTO vValorAtual
		FROM cofrinho
			WHERE cd_cofrinho = pCodigoCofrinho
			  AND FK_nm_email = pEmail
			  AND dt_exclusao IS NULL;

		UPDATE cofrinho
			SET dt_exclusao = NOW(),
			    vl_cofrinho_atual = 0
			WHERE cd_cofrinho = pCodigoCofrinho
			  AND FK_nm_email = pEmail
			  AND dt_exclusao IS NULL;

		UPDATE carteira
			SET vl_carteira = vl_carteira + vValorAtual
			WHERE cd_carteira = pCarteira;
	END$$

	DROP PROCEDURE IF EXISTS guardar_cofrinho$$
	CREATE PROCEDURE guardar_cofrinho(pEmail VARCHAR(200), pCodigoCofrinho INT, pValor DECIMAL(10,2))
	BEGIN
		DECLARE pCarteira INT DEFAULT 0;
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE qtdCofrinho INT DEFAULT 0;
		DECLARE pCodigoMovimentacao INT DEFAULT 0;
		DECLARE maiorCodigo INT DEFAULT 0;
					
		SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;

		SELECT COUNT(*) INTO qtdCofrinho
			FROM cofrinho
			WHERE cd_cofrinho = pCodigoCofrinho
			  AND FK_nm_email = pEmail
			  AND dt_exclusao IS NULL;
		IF qtdCofrinho = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cofrinho não encontrado para esse usuário';
		END IF;
		
			IF pValor <= 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
			END IF;
		
		SELECT IFNULL(MAX(cd_movimentacao), 0) INTO maiorCodigo FROM movimentacao_cofrinho;
			SET pCodigoMovimentacao = maiorCodigo + 1;
		
		SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
		
		INSERT INTO movimentacao_cofrinho (cd_movimentacao, vl_movimentacao, dt_movimentacao, ic_tipo_movimentacao, FK_nm_email, FK_cd_cofrinho) VALUES (pCodigoMovimentacao, pValor, curdate(), 'guardar', pEmail, pCodigoCofrinho);
					
		UPDATE carteira
			SET vl_carteira = vl_carteira - pValor
			WHERE cd_carteira = pCarteira;
			
		 UPDATE cofrinho
			SET vl_cofrinho_atual = vl_cofrinho_atual + pValor
			WHERE  cd_cofrinho = pCodigoCofrinho;
            
            UPDATE cofrinho
				SET dt_conclusao = NOW()
				WHERE cd_cofrinho = pCodigoCofrinho
				AND FK_nm_email = pEmail
				AND dt_conclusao IS NULL
				AND vl_cofrinho_atual >= vl_cofrinho_final;
			
			CALL verificar_insignias_cofrinho(pEmail);
            CALL `trit`.`verificar_desafios`(pEmail);

	END$$
		
	DROP PROCEDURE IF EXISTS resgatar_cofrinho$$
	CREATE PROCEDURE resgatar_cofrinho(pEmail VARCHAR(200), pCodigoCofrinho INT, pValor DECIMAL(10,2))
	BEGIN
			DECLARE pCarteira INT DEFAULT 0;
			DECLARE qtdUsuario INT DEFAULT 0;
			DECLARE qtdCofrinho INT DEFAULT 0;
			DECLARE pCodigoMovimentacao INT DEFAULT 0;
			DECLARE maiorCodigo INT DEFAULT 0;
						
			SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
				IF qtdUsuario = 0 THEN
					SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
			END IF;

			SELECT COUNT(*) INTO qtdCofrinho
				FROM cofrinho
				WHERE cd_cofrinho = pCodigoCofrinho
				  AND FK_nm_email = pEmail
				  AND dt_exclusao IS NULL;
			IF qtdCofrinho = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cofrinho não encontrado para esse usuário';
			END IF;
			
			IF pValor <= 0 THEN
					SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valor não pode ser menor que 0';
				END IF;
			
			SELECT IFNULL(MAX(cd_movimentacao), 0) INTO maiorCodigo FROM movimentacao_cofrinho;
				SET pCodigoMovimentacao = maiorCodigo + 1;
			
			SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
			
			INSERT INTO movimentacao_cofrinho (cd_movimentacao, vl_movimentacao, dt_movimentacao, ic_tipo_movimentacao, FK_nm_email, FK_cd_cofrinho) VALUES (pCodigoMovimentacao, pValor, curdate(), 'resgatar', pEmail, pCodigoCofrinho);
						
			UPDATE carteira
				SET vl_carteira = vl_carteira + pValor
				WHERE cd_carteira = pCarteira;
				
			 UPDATE cofrinho
				SET vl_cofrinho_atual = vl_cofrinho_atual - pValor
				WHERE  cd_cofrinho = pCodigoCofrinho;
		END$$
        
        
    DROP PROCEDURE IF EXISTS listar_extrato$$
	CREATE PROCEDURE listar_extrato(pEmail VARCHAR(200), pAno INT, pMes INT)
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
        DECLARE pCarteira INT DEFAULT 0;
        DECLARE pInicio DATE DEFAULT  '1000-01-01';
        DECLARE pFim DATE DEFAULT  '3000-12-31';
        
        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
        
        SELECT cd_carteira INTO pCarteira FROM Carteira WHERE FK_nm_email = pEmail LIMIT 1;
        
        IF pAno !=  -1 THEN
			IF pMes != -1 THEN
				SET pInicio = MAKEDATE(pAno, 1) + INTERVAL (pMes - 1) MONTH;
                SET pFim = pInicio + interval 1 month;
            ELSE
				SET pInicio = MAKEDATE(pAno, 1);
				SET pFim = pInicio + interval 1 year;
			END IF;
        end if;
        
        SELECT 'entrada' AS origem, cd_entrada AS codigo, nm_entrada AS nome, vl_entrada AS valor, dt_entrada AS data
			FROM entrada
			WHERE FK_cd_carteira = pCarteira
            AND dt_entrada >= pInicio 
            AND dt_entrada < pFim 

		UNION ALL

		SELECT 'saida', cd_saida, nm_saida, vl_saida, dt_saida
			FROM saida
			WHERE FK_cd_carteira = pCarteira
            AND dt_saida >= pInicio 
            AND dt_saida < pFim 

		UNION ALL

		SELECT 'resgatar', MC.cd_movimentacao, c.nm_cofrinho, mc.vl_movimentacao, mc.dt_movimentacao
			FROM movimentacao_cofrinho mc
            JOIN cofrinho c
            ON c.cd_cofrinho = mc.FK_cd_cofrinho
			WHERE mc.FK_nm_email = pEmail
            AND ic_tipo_movimentacao = 'resgatar'
            AND dt_movimentacao >= pInicio 
            AND dt_movimentacao < pFim
        
        UNION ALL
        
		SELECT 'guardar', MC.cd_movimentacao, c.nm_cofrinho, mc.vl_movimentacao, mc.dt_movimentacao
			FROM movimentacao_cofrinho mc
            JOIN cofrinho c
            ON c.cd_cofrinho = mc.FK_cd_cofrinho
			WHERE mc.FK_nm_email = pEmail
            AND ic_tipo_movimentacao = 'guardar'
            AND dt_movimentacao >= pInicio 
            AND dt_movimentacao < pFim

		ORDER BY data DESC;
	END$$

    DROP PROCEDURE IF EXISTS calcular_insignia_completados$$
	CREATE PROCEDURE calcular_insignia_completados(pEmail VARCHAR(200), pQuantidade INT, pCodigoInsignia INT)
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE qtdCofrinho INT DEFAULT 0;
	 
		SELECT count(*) INTO qtdUsuario FROM Usuario WHERE nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
	 
		SELECT count(*) INTO qtdCofrinho FROM cofrinho
			WHERE FK_nm_email = pEmail AND vl_cofrinho_atual >= vl_cofrinho_final;
	 
		IF qtdCofrinho >= pQuantidade THEN
			INSERT IGNORE INTO usuario_insignia (FK_nm_email, FK_cd_insignia) VALUES (pEmail, pCodigoInsignia);
		END IF;
	END$$
    DROP PROCEDURE IF EXISTS calcular_primeiro_cofrinho_criado$$
	CREATE PROCEDURE calcular_primeiro_cofrinho_criado(pEmail VARCHAR(200))
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE qtdCofrinho INT DEFAULT 0;

		SELECT count(*) INTO qtdUsuario FROM Usuario WHERE nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;

		SELECT count(*) INTO qtdCofrinho FROM cofrinho WHERE FK_nm_email = pEmail;

		IF qtdCofrinho >= 1 THEN
			INSERT IGNORE INTO usuario_insignia (FK_nm_email, FK_cd_insignia) VALUES (pEmail, 1);
		END IF;
	END$$
    DROP PROCEDURE IF EXISTS calcular_primeiro_cofrinho_determinado_completado$$
	CREATE PROCEDURE calcular_primeiro_cofrinho_determinado_completado(pEmail VARCHAR(200))
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE qtdCofrinho INT DEFAULT 0;
	 
		SELECT count(*) INTO qtdUsuario FROM Usuario WHERE nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
	 
		SELECT count(*) INTO qtdCofrinho FROM cofrinho
			WHERE FK_nm_email = pEmail
			  AND ic_tipo_cofrinho = 'determinado'
			  AND vl_cofrinho_atual >= vl_cofrinho_final;
	 
		IF qtdCofrinho >= 1 THEN
			INSERT IGNORE INTO usuario_insignia (FK_nm_email, FK_cd_insignia) VALUES (pEmail, 4);
		END IF;
	END$$
    DROP PROCEDURE IF EXISTS verificar_insignias_cofrinho$$
	CREATE PROCEDURE verificar_insignias_cofrinho(pEmail VARCHAR(200))
	BEGIN
		CALL calcular_primeiro_cofrinho_criado(pEmail);
		CALL calcular_insignia_completados(pEmail, 1, 2);
		CALL calcular_insignia_completados(pEmail, 5, 3);
		CALL calcular_insignia_completados(pEmail, 10, 5);
		CALL calcular_primeiro_cofrinho_determinado_completado(pEmail);
	END$$
    
    DROP PROCEDURE IF EXISTS listar_insignias$$
	CREATE PROCEDURE listar_insignias(pEmail VARCHAR(200))
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
        
        CALL `trit`.`verificar_insignias_cofrinho`(pEmail);

        
        SELECT count(*) into qtdUsuario from Usuario where nm_email = pEmail;
			IF qtdUsuario = 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;
        
        select ui.FK_nm_email, ui.FK_cd_insignia,
			i.nm_insignia, i.nm_tipo_insignia
			from usuario_insignia ui
			JOIN insignia i
			ON 
			i.cd_insignia = ui.FK_cd_insignia
			WHERE FK_nm_email = pEmail;       
	END$$
    
	DROP PROCEDURE IF EXISTS listar_desafios_usuario$$
	CREATE PROCEDURE listar_desafios_usuario(pEmail VARCHAR(200))
	BEGIN
		DECLARE qtdUsuario INT DEFAULT 0;
		
        CALL selecionar_desafios (pEmail);
		
		SELECT count(*) INTO qtdUsuario FROM Usuario WHERE nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;

		SELECT du.cd_desafio_usuario, du.FK_cd_desafio, du.FK_nm_email, du.ic_concluido, d.nm_desafio
		FROM Desafio_Usuario du
		JOIN Desafio d ON d.cd_desafio = du.FK_cd_desafio
		WHERE du.FK_nm_email = pEmail
		  AND du.ic_concluido = 0;
END$$
    
    DROP PROCEDURE IF EXISTS selecionar_desafios$$
	CREATE PROCEDURE selecionar_desafios(pEmail VARCHAR(200))
	BEGIN		
        DECLARE qtdUsuario INT DEFAULT 0;
		DECLARE vNivel INT DEFAULT 0;
		DECLARE vPendentes INT DEFAULT 0;
		DECLARE vFaltam INT DEFAULT 0;
     
		SELECT count(*) INTO qtdUsuario FROM Usuario WHERE nm_email = pEmail;
		IF qtdUsuario = 0 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario não encontrado';
		END IF;

		SELECT FLOOR(qt_pontos / 15) INTO vNivel FROM Usuario WHERE nm_email = pEmail;

		SELECT COUNT(*) INTO vPendentes
			FROM Desafio_Usuario
			WHERE FK_nm_email = pEmail AND ic_concluido = 0;
		SET vFaltam = GREATEST(2 - vPendentes, 0);

		INSERT IGNORE INTO Desafio_Usuario (FK_cd_desafio, FK_nm_email, ic_concluido)
		SELECT cd_desafio, pEmail, 0
			FROM Desafio
			WHERE qt_nivel_desafio <= GREATEST(vNivel, 1)
			ORDER BY RAND()
			LIMIT vFaltam;
	END$$
    
	DROP PROCEDURE IF EXISTS calcular_desafios_cofrinhos_concluidos$$
	CREATE PROCEDURE calcular_desafios_cofrinhos_concluidos(pEmail VARCHAR(200))
	BEGIN
		UPDATE Usuario
			SET qt_pontos = qt_pontos + (
				SELECT IFNULL(SUM(d.qt_pontos_desafio), 0)
				FROM Desafio_Usuario du
				JOIN Desafio d ON d.cd_desafio = du.FK_cd_desafio
				WHERE du.FK_nm_email = pEmail
				  AND du.ic_concluido = 0
				  AND d.nm_tipo_desafio = 'cofrinhos_concluidos'
				  AND (SELECT COUNT(*) FROM Cofrinho c
					   WHERE c.FK_nm_email = pEmail
						 AND c.dt_exclusao IS NULL
						 AND c.dt_conclusao >= du.dt_atribuicao) >= d.qt_meta_desafio)
			WHERE nm_email = pEmail;

		UPDATE Desafio_Usuario du
			JOIN Desafio d ON d.cd_desafio = du.FK_cd_desafio
			SET du.ic_concluido = 1
			WHERE du.FK_nm_email = pEmail
			  AND du.ic_concluido = 0
			  AND d.nm_tipo_desafio = 'cofrinhos_concluidos'
			  AND (SELECT COUNT(*) FROM Cofrinho c
				   WHERE c.FK_nm_email = pEmail
					 AND c.dt_exclusao IS NULL
					 AND c.dt_conclusao >= du.dt_atribuicao) >= d.qt_meta_desafio;
	END$$

	DROP PROCEDURE IF EXISTS verificar_desafios$$
	CREATE PROCEDURE verificar_desafios(pEmail VARCHAR(200))
	BEGIN
		CALL calcular_desafios_cofrinhos_concluidos(pEmail);
	END$$
    
    DROP PROCEDURE IF EXISTS listar_todas_insignias$$
	CREATE PROCEDURE `listar_todas_insignias`()
	BEGIN
		SELECT cd_insignia, nm_insignia, nm_tipo_insignia FROM trit.insignia;
	END$$
    
    DROP PROCEDURE IF EXISTS listar_saidas_pendentes$$
    CREATE PROCEDURE listar_saidas_pendentes(pEmail VARCHAR(200))
	BEGIN
	SELECT s.cd_saida, s.nm_saida, s.vl_saida, s.dt_saida, s.dt_prazo_saida, s.ic_tipo_saida, s.ic_status_saida, s.qt_parcelas,
	c.FK_nm_email
	FROM trit.saida s
	JOIN trit.carteira c
	ON s.FK_cd_carteira = c.`cd_carteira`
	WHERE ic_status_saida = 'pendente'
	AND FK_nm_email = pEmail; 
	END$$
delimiter ;