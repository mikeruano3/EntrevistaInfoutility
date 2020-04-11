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