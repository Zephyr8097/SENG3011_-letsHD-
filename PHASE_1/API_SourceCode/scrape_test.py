from bs4 import BeautifulSoup
import requests
import re
from lxml import etree
import string
#from utils import load_config
#from utils import mysql
import mysql.connector


db = mysql.connector.connect(
    host="database-1.ctn2lesi9qqn.us-east-1.rds.amazonaws.com",
    user="admin",
    passwd="letsgethd",
    database="backup"
)

mycursor = db.cursor()
sql = 'INSERT INTO test_covid(country, url, level) VALUES ("hhh", "jjj", "kkk")'
mycursor.execute(sql)
db.commit()