CREATE TABLE users (
    id int,
    first_name varchar,
    last_name varchar,
    birthday date, 
    email varchar, 
    password text
); 


CREATE TABLE coffee_shops (
    id int,
    name varchar,
    longitude double, 
    latitude double, 
    link text,
    amenities json
); 

CREATE TABLE review (
    shop_id int,
    stars int,
    review text
); 