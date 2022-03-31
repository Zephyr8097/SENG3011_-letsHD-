from bs4 import BeautifulSoup
import requests
import re
from lxml import etree
import string
from utils import load_config
from utils import mysql

config = load_config()
mysql = mysql(config['mysql'])
sql = "select * from article"      
result = mysql.exe(sql)
#print(result)

for word in string.ascii_lowercase:
    #kkprint(word)
    html_text = requests.get('https://www.cdc.gov/az/' + word + '.html').text
    soup = BeautifulSoup(html_text, 'lxml')
    reports = soup.find_all('ul', class_ = 'unstyled-list pl-0')
    for report in reports:
        index_list = report.find_all('li')
        for item in index_list:
            report_content = str(item.find('a'))
                #print(item)
            p1 = re.compile(r'[(](.*?)[)]', re.S)
            if len(report_content.split("\"")) > 3:
                report_link = str(report_content.split("\"")[3])
            else:
                report_link = str(report_content.split("\"")[1])

            html_text_2 = requests.get(report_link).text
            soup_2 = BeautifulSoup(html_text_2, 'lxml')
            pb_2 = soup_2.find('div', class_="col last-reviewed").text
            #print(pb)
            tmp = str(pb_2).split(':')[1].split('Content')[0].lstrip()
            print(tmp)