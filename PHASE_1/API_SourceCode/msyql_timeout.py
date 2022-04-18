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
mycursor.execute('SET GLOBAL connect_timeout=6000')
db.commit()
print("finished")