drop database entrevista;
create database entrevista;
use entrevista;

drop table IF EXISTS person;
CREATE TABLE IF NOT EXISTS person (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    person_cui VARCHAR(255) NOT NULL,
    person_balance double,
    person_image TEXT
);

select * from person;
DROP PROCEDURE actualizarSaldo;

DELIMITER $$

CREATE PROCEDURE actualizarSaldo (
    IN  porcentaje INT
)
BEGIN
    DECLARE finished INTEGER DEFAULT 0;
    DECLARE person_id_temp INTEGER DEFAULT 0;
    
       -- declare cursor for people
    DEClARE curPeople 
        CURSOR FOR 
            SELECT person_id FROM person;
 
    -- declare NOT FOUND handler
    DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1;
        
        
	OPEN curPeople;
 
    updateBalances: LOOP
        FETCH curPeople INTO person_id_temp;

        IF finished = 1 THEN 
            LEAVE updateBalances;
        END IF;
        -- build email list
        UPDATE person
			SET person_balance = (person_balance + 5) * (porcentaje / 100)
		WHERE person_id = person_id_temp
        ;
    END LOOP updateBalances;
    CLOSE curPeople;
    
	
    /* UPDATE person
    SET person_balance = (person_balance + 5) * (porcentaje / 100)
    WHERE person_id = personId;
    */
END$$
 
DELIMITER ;


CALL actualizarSaldo(10);
