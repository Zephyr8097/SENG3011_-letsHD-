from itertools import combinations
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

disease_html_text = requests.get('https://wwwnc.cdc.gov/travel/diseases/african-tick-bite-fever').text
soup2 = BeautifulSoup(disease_html_text, 'lxml')
path = soup2.find_all('div', class_ = 'span19')
for detail in path:
    texts = detail.find_all('p')
    combination = ""
    for text in texts:
        if type(text.string) is not NoneType:
        #print(text.string)
            combination = combination+text.string
#print(combination)
last_reviewed = soup2.find('div', class_ = 'col last-reviewed')
#date_of_publication = str(last_reviewed).split(':')[1].split('Content')[0].lstrip()
#print(list(last_reviewed)[7])
date_of_publication = str(list(last_reviewed)[7]).split(">")[2].split("<")[0]
#print(str(list(last_reviewed)[7]).split(">")[2].split("<")[0])
'''
for child in last_reviewed.children:
    #print(child)
    divs = child._find_all('div')
    for div in divs:
        date_of_publication = div.find_all('span').string
print(date_of_publication)
'''
#print(date_of_publication)
    #title_wanted = titles[1]
    #info = title_wanted.next_sibling
    #print(texts[1])
    #for title in titles:
    #print(titles[1])

   