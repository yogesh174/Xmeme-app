#!/bin/bash

sudo mysql << EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passwd';
CREATE DATABASE memes;
USE memes;
CREATE TABLE data (id int NOT NULL AUTO_INCREMENT, name varchar(255), url varchar(255), caption varchar(255), PRIMARY KEY (id));
EOF

python3 app.py