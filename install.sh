#!/bin/bash

sudo apt-get update
sudo apt-get install python3 python3-pip libmysqlclient20 libmysqlclient-dev mysql-server   -y

pip3 install -r backend/requirements.txt

sudo service mysql start