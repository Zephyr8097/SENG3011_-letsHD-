from types import NoneType
from bs4 import BeautifulSoup
import requests
import re
from lxml import etree
import string
#from utils import load_config
#from utils import mysql
import mysql.connector

#config = load_config()
#mysql = mysql(config['mysql'])

db = mysql.connector.connect(
    host="database-1.ctn2lesi9qqn.us-east-1.rds.amazonaws.com",
    user="admin",
    passwd="letsgethd",
    database="backup"
)

mycursor = db.cursor()

html_text = requests.get('https://wwwnc.cdc.gov/travel/diseases').text
soup = BeautifulSoup(html_text, 'lxml')
diseases = soup.find_all('ul', class_ = 'block-list cc-md-2 lsp-out td-none td-ul-hover')
for disease in diseases:
    disease_list = disease.find_all('li')
    for item in disease_list:
        try:
            #print(item)
            item_content = str(item.find('a'))
            #print(item_content)
            url_ep = item_content.split("\"")[1]
            disease_url = str('https://wwwnc.cdc.gov' + url_ep)
            disease_name = str(item_content.split(">")[1].split("<")[0])
            disease_html_text = requests.get(disease_url).text
            soup2 = BeautifulSoup(disease_html_text, 'lxml')
            path = soup2.find_all('div', class_ = 'span19')
            combination = ""
            for detail in path:
                texts = detail.find_all('p')
                #combination = ""
                for text in texts:
                    if type(text.string) is not NoneType:
                        combination = combination+text.string
            combination = str(combination)
            #print(combination)c
            last_reviewed = soup2.find('div', class_ = 'col last-reviewed')
            date_of_publication = str(list(last_reviewed)[7]).split(">")[2].split("<")[0]
            print(f'report_description: {disease_name}')
            print(f'report_link: {disease_url}')
            print(f'date_of_publication: {date_of_publication}')
            print(f'info: {combination}')
            mycursor.execute("insert into new_article_d4 (headline, url, date_of_publication, main_text) values (%s, %s, %s, %s)", (disease_name, disease_url, date_of_publication, combination))
            db.commit()
            print("sth right happended")
        except:
            print("sth wrong happended")
            continue
        




