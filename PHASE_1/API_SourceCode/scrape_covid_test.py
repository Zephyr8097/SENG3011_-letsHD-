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


#config = load_config()
#mysql = mysql(config['mysql'])
'''
sql = "select * from covid"      
result = mysql.exe(sql)
print(result)
'''
#timeout_sql = "SET GLOBAL connect_timeout = 600"
#result = mysql.exe(timeout_sql)

html_text = requests.get('https://www.cdc.gov/coronavirus/2019-ncov/travelers/map-and-travel-notices.html').text
soup = BeautifulSoup(html_text, 'lxml')
level_info = soup.find_all('div', class_ = 'card-header h4 bg-primary')

#get all levels
levels = []
for each_info in level_info:
    level = str(each_info).split(">")[1].split('<')[0]
    levels.append(level)
    #print(level)

def get_detail(num):
    ral_num = num+1
    class_match = 'ral'+str(ral_num)
    print(class_match)
    level_detail = soup.find_all('div', class_ = class_match)
#print(level)
    for each_level in level_detail:
        location = each_level.find_all('li')
        print(location)
        for detail in location:
            try:
                '''
                sql = 'select * from article'
                mysql.exe(sql)
                '''
                content = str(detail.find('a'))
                url = '"' + str(content).split("\"")[1] + '"'
                country = '"' + str(content).split(">")[1].split("<")[0] + '"'
                print(f"url is {url}")
                print(f"country is {country}")
                print(f"level is {levels[num]}")
                #print("before sql insert")
                #mycursor.execute("insert into covid (country, url, level) values (%s, %s, %s)", (country, url, levels[num]))
                #db.commit()
                #print("after sql insert")
            except:
                print("sql has some problem")
                #print(err)
                continue

get_detail(0)
print("ral1 is over")
get_detail(1)
print("ral2 is over")
get_detail(2)
print("ral3 is over")
get_detail(3)
print("ral4 is over")
get_detail(4)
print("ral5 is over")

#result = mysql.exe(sql)
#print(result)
   
'''
level_detail = soup.find_all('div', class_ = 'ral1')
#print(level)
for each_level in level_detail:
    location = each_level.find_all('li')
    #print(location)
    for detail in location:
        try:
            content = str(detail.find('a'))
            url = str(content.split("\"")[1]) 
            country = str(content.split(">")[1].split("<")[0])
            print(f"url is {url}")
            print(f"country is {country}")
            print(f"level is {levels[0]}")
        except:
            continue
'''