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

insert into task (id_user, name_task, description_task) values(
16, "task teste", "esta task e apenas um teste no banco de dados");

insert into users (name_user, lastname_user, tel_number, email, password) values (
"aa", "Vitaaor", "(12) 99171-3782", "jvM@gmail.com", "aaaaa"
);

update task set 
status_task = "Concluido"
where id_task = 2;

delete from users where id = 5;

#drop table task;

SELECT * FROM users;
SELECT * FROM task;

