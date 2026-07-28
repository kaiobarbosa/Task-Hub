SET GLOBAL event_scheduler = ON;

create database th_database;
use th_database;

create table users (
id int not null primary key auto_increment,
name_user varchar(255) not null,
lastname_user varchar(255) not null,
tel_number varchar(15) not null,
email varchar(255) not null,
password varchar(255) not null
);

create table task (
id_task int not null primary key auto_increment,
id_user int not null,
name_task varchar(255) not null,
description_task varchar(500) not null,
date_create datetime,
date_complete datetime,
status_task varchar (9) not null,
foreign key(id_user) references users(id)
);

DELIMITER $$

CREATE TRIGGER trg_set_date_complete
BEFORE UPDATE ON task
FOR EACH ROW
BEGIN
    IF NEW.status_task = 'concluido' AND OLD.status_task != 'concluido' THEN
        SET NEW.date_complete = CURRENT_TIMESTAMP;
    
    ELSEIF NEW.status_task != 'concluido' AND OLD.status_task = 'concluido' THEN
        SET NEW.date_complete = NULL;
    END IF;
END$$

DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_insert_status_task
BEFORE INSERT ON task
FOR EACH ROW
BEGIN
	SET NEW.status_task = "Pendente";
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_insert_date_create_task
BEFORE INSERT ON task
FOR EACH ROW
BEGIN
	SET NEW.date_create = NOW();
END$$
DELIMITER ;

DELIMITER $$

CREATE EVENT ev_delete_completed_tasks
ON SCHEDULE EVERY 1 HOUR
DO
BEGIN
    DELETE FROM task 
    WHERE status_task = 'Concluido' 
      AND date_complete <= NOW() - INTERVAL 24 HOUR;
END$$

DELIMITER ;
