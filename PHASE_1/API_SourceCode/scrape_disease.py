from types import NoneType
from bs4 import BeautifulSoup
import requests
import re
from lxml import etree
import string
from utils import load_config
from utils import mysql

#config = load_config()
#mysql = mysql(config['mysql'])

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
            disease_url = 'https://wwwnc.cdc.gov' + url_ep
            diseasae_name = item_content.split(">")[1].split("<")[0]
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
            #print(combination)
            last_reviewed = soup2.find('div', class_ = 'col last-reviewed')
            date_of_publication = str(list(last_reviewed)[7]).split(">")[2].split("<")[0]
            print(f'report_description: {diseasae_name}')
            print(f'report_link: {disease_url}')
            print(f'date_of_publication: {date_of_publication}')
            print(f'info: {combination}')
        except:
            continue
        




