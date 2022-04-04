from bs4 import BeautifulSoup
import requests
import re
from lxml import etree
import string
from utils import load_config
from utils import mysql

config = load_config()
mysql = mysql(config['mysql'])
sql = "select * from new_article"      
result = mysql.exe(sql)
print(result)
#timeout_sql = "SET GLOBAL connect_timeout = 600"
#result = mysql.exe(timeout_sql)


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
                    report_link = str(report_content.split("\"")[3]) 
                else:
                    report_link = str(report_content.split("\"")[1]) 
                #report_description = report_content.split("\"")[-1].split('\>')[0]
                #get report_descritption
                patternStr = r'%s(.+?)%s'%('\>', '\<')
                p = re.compile(patternStr,re.IGNORECASE)
                m = re.match(p, report_content.split("\"")[-1])
                report_description = '"' + str(m.group(1)) + '"'
                print(f'report_description: {report_description}')
                print(f'report_link: {report_link}')
                #sql = 'insert into article(url, headline) values(' +  report_description+ ', ' + '"' + report_link + '"' + ')'
                #mysql.exe(sql)

                html_text_2 = requests.get(report_link).text
                soup_2 = BeautifulSoup(html_text_2, 'lxml')
                pb_2 = soup_2.find('div', class_="col last-reviewed").text
                #print(pb)
                date_of_publication = str(pb_2).split(':')[1].split('Content')[0].lstrip()
                print(f'date_of_publication: {date_of_publication}')
                #sql = 'insert into article(date_of_publication) values(' + '"' + tmp + '"' + ')'
                sql = 'insert into new_article(headline, url, date_of_publication) values(' +  report_description+ ', ' + '"' + report_link + '"' + ', ' + '"' + date_of_publication + '"' + ')'
                mysql.exe(sql)
                print("sth right happended")
            except:
                print("sth wrong happended")
                continue
            
            
            

sql = "select * from article"      
result = mysql.exe(sql)
print(result)
   
