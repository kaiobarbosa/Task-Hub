use webdatabase;

insert into users (nome, sobrenome, cep, email, senha) values 
('Kaio Eduardo', 
'Braga Barbosa',
'12240050',
'kaio.barbosa0824@gmail.com',
'Kaio2419062123$');

select * from users;

delete from users where id > 1;