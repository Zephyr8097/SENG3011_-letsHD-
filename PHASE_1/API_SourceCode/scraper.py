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
print(result)


for word in string.ascii_lowercase:
    #kkprint(word)
    html_text = requests.get('https://www.cdc.gov/az/' + word + '.html').text

    #html_text = requests.get('https://www.cdc.gov/az/a.html').text
    ##print(html_text)
    soup = BeautifulSoup(html_text, 'lxml')
    reports = soup.find_all('ul', class_ = 'unstyled-list pl-0')
    #print(reports)
    for report in reports:
        #report_content = report.find('li')
        #print(report)
        #print(report.find('li'))
        index_list = report.find_all('li')
        for item in index_list:
            try:
                report_content = str(item.find('a'))
                #print(item)
                p1 = re.compile(r'[(](.*?)[)]', re.S)
                if len(report_content.split("\"")) > 3:
                    report_link = '"' + str(report_content.split("\"")[3]) + '"'
                else:
                    report_link = '"' + str(report_content.split("\"")[1]) + '"'
                #report_description = report_content.split("\"")[-1].split('\>')[0]
                #get report_descritption
                patternStr = r'%s(.+?)%s'%('\>', '\<')
                p = re.compile(patternStr,re.IGNORECASE)
                m = re.match(p, report_content.split("\"")[-1])
                report_description = '"' + str(m.group(1)) + '"'
                print(f'report_description: {report_description}')
                print(f'report_link: {report_link}')
                sql = 'insert into article(url, headline) values(' +  report_description+', '+ report_link + ')'
                mysql.exe(sql)
            except:
                continue
sql = "select * from article"      
result = mysql.exe(sql)
print(result)
   
