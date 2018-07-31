DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name varchar(50) NOT NULL,
    department_name varchar(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Solid State Drives", "Computers", 125, 20),
("Peyote Cactus", "Plants", 55, 20),
("Jans Sport Backpack", "Backpacks", 35, 10),
("Himalyan Seasalt Lamp", "Home", 15, 100),
("Arctic Monkeys Album", "Music", 20, 100),
("Vizio TV", "TV", 250, 10),
("Nail Polish", "Beauty", 10, 50),
("The One Ring", "Jewelry", 1000000, 1),
("Mona Lisa", "Painting", 1000000, 1),
("Playstation 4", "Electronics", 700, 20);

SELECT * FROM products;
