from os import lseek
import requests


BASE = "http://127.0.0.1:5000/"
'''
response = requests.get(BASE + "/results/1")
print(response.json())
input()
response2 = requests.get(BASE + "/results/4")
print(response2.json())
input()
 
response3 = requests.get(BASE + "/reports/e coli/00")
print(response3.json())
input()
response4 = requests.get(BASE + "reports_keyword/E. COLI")
print(response4.json())
input()
'''
response5 = requests.get(BASE + "reports_keyword/Covid-19")
print(response5.json())
input()
response6 = requests.get(BASE + "reports")
print(response6.json())
input()
response7 = requests.get(BASE + "reports/covid-19/NSW")
print(response7.json())
input()
response8 = requests.get(BASE + "reports//NSW")
print(response8.json())