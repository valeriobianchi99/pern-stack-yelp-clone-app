--- for help \?

--- list of databases \l

--- Create database CREATE DATABASE <name>;

--- list all tables \d

--- structure of the table \d <table-name>

CREATE DATABASE practice;

CREATE TABLE products (
    id INT, 
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);

ALTER TABLE products
ADD COLUMN featured BOOLEAN;

ALTER TABLE products
DROP COLUMN featured;

DROP TABLE products;

DROP DATABASE practice;



--- YELP DATABASE

CREATE DATABASE yelp;

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants(id, name, location, price_range) VALUES (
    123,
    'McDonalds',
    'New York',
    3
);

INSERT INTO restaurants(id, name, location, price_range) VALUES (
    124,
    'Pizza Hut',
    'Las Vegas',
    2
);

SELECT * FROM restaurants;

SELECT name AS Restaurant, price_range AS Level FROM restaurants;

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 AND rating <= 5)
);


SELECT COUNT(*) FROM reviews;

SELECT MIN(rating) FROM reviews;

SELECT MAX(rating) FROM reviews;

SELECT AVG(rating) FROM reviews;

SELECT TRUNC(AVG(RATING), 2) AS average_rating FROM (
    SELECT * FROM reviews WHERE restaurant_id = 5
) AS restaurant_reviews;

--- Simpler way

SELECT TRUNC(AVG(RATING), 2) AS average_rating FROM reviews WHERE restaurant_id = 5;

SELECT COUNT(*) FROM reviews WHERE restaurant_id = 5;

SELECT location, COUNT(*) FROM restaurants GROUP BY location;

SELECT restaurant_id, COUNT(*) FROM reviews GROUP BY restaurant_id;

SELECT restaurant_id, AVG(rating), COUNT(*) FROM reviews GROUP BY restaurant_id;

--- Only restaurants that have a review(s)
SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;

--- Every restaurant
SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;


SELECT * FROM restaurants LEFT JOIN (
    SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id
) reviews ON restaurants.id = reviews.restaurant_id;

