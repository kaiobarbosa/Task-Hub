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

insert into users (name_user, lastname_user, tel_number, email, password) values (
"aa", "Vitaaor", "(12) 99171-3782", "jvM@gmail.com", "aaaaa"
);

update users set 
name_user = "Joao Vitor", 
lastname_user = "Marques",
tel_number = "(12) 73799-3433",
email = "jvM@gmail.com",
password = "123123" where id = 1;

delete from users where id = 5;

SELECT * FROM users;