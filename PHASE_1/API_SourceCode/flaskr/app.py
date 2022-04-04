#from asyncio.windows_events import NULL
import os

from flask import Flask, render_template
from flask import request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy


import re
from datetime import datetime
import mysql.connector

import json
import time


# create and configure the app
#conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format('admin', 'letsgethd', 'database-1.ctn2lesi9qqn.us-east-1.rds.amazonaws.com', 'backup')
app = Flask(__name__, instance_relative_config=True)
api = Api(app)

#app.config['SECRET_KEY'] = 'SuperSecretKey'
#app.config['SQLALCHEMY_DATABASE_URI'] = conn
#db = SQLAlchemy(app)


db = mysql.connector.connect(
    host='database-1.ctn2lesi9qqn.us-east-1.rds.amazonaws.com', 
    user="admin",
    passwd="letsgethd",
    database="backup"       
)
mycursor = db.cursor()
#mycursor.execute("select * from article")

#print(type(mycursor))


'''
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)


if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    app.config.from_mapping(test_config)
'''
# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass


@app.route("/")
def hello_world(): 
    return "<p>Wellcome!</p>"

'''
@app.route('/result', methods=['GET', 'POST'])
def get_name():
    if request.method == 'POST':
        return 'jax from post'
    else:    
        return 'jax from get'

@app.route("/userinform")
def getnumoffans():
    if (request.args.get('name', '') == 'jax'):
        return dict(name='jax', fans=100)
    else:   
        return dict(name='lamchi', fans='100000')
'''





'''
results = {"1": {"url": "www.cdc.com", "date": "2022-01006T00:00:00"}, "2": {"url": "www.google.com", "date": "2021-01006T00:00:00"}}

def abort_if_result_id_invalid(result_id):
    if result_id not in results:
        abort(404, message="result is not valid")

class Results(Resource):
    def get(self, result_id):
        abort_if_result_id_invalid(result_id)
        return results[result_id]


api.add_resource(Results, "/results/<string:result_id>")

 
#reports = data.reports
reports = Article.query
print(reports)
def abort_if_report_invalid():
    return NULL

##filter out the list if reports that are satisfised
def filter_reports(diease_name, date):
    fit_reports = []
    for report in reports:
        if report['diease_name'] == diease_name or report['date'] == date:
            fit_reports.append(report)
        return fit_reports

def filter_reports_final(start_time, end_time, key_word, place):
    return 

def filter_keyterm(key_term, pre_reports):
    fit_reports = []
    if key_term is not None:
        for report in reports:
            match_string = report['title']
            match_string = match_string.lower()
            key_term = key_term.lower()
            if match_string.find(key_term) != -1:
                fit_reports.append(report)
    else:
        fit_reports = pre_reports
    return fit_reports    

def filter_place(place, pre_reports):
    fit_reports = []
    if place is not None: 
        ##details = pre_reports['details']
        for report in pre_reports:
            details = report['details']
            for detail in details:
                ##for location in detail['location']:
                if place.upper() in detail['location']:
                    fit_reports.append(report)
    else:
        fit_reports = pre_reports
    return fit_reports

#get the list of all reports
class Reports(Resource):
    def get(self):
        return reports

api.add_resource(Reports, "/reports")
            
'''
# list 转成Json格式数据
def listToJson(lst):
    import json
    import numpy as np
    keys = [str(x) for x in np.arange(len(lst))]
    list_json = dict(zip(keys, lst))
    str_json = json.dumps(list_json, indent=2, ensure_ascii=False) 
    return str_json




def filter_keyterm(key_term):
    fit_articles = []
    if key_term is not None:
        mycursor.execute("select * from article where headline like" + "'%" + key_term + "%'")
        #mycursor.execute(f"select * from article where headline = '{key_term}'")
        
        for x in mycursor:
            #fit_articles.append(x)  
            article_dict = {'id': x[0], 'headline': x[1], 'date_of_publication': x[2], 'url': x[3], 'main_text': x[4], 'reports': [5]}
            article_dict_json = json.dumps(article_dict, indent=6)
            fit_articles.append(article_dict)
        '''
        print(fit_articles)  
        '''
    return fit_articles

def covid_filter_country(country):
    fit_locations = []
    if country is not None:
        mycursor.execute("select * from covid where headline like" + "'%" + country + "%'")
        for x in mycursor:
            location_dict = {'id': x[0], 'country': x[1], 'url': x[2], 'level': x[3]}
            #location_dict = json.dumps(location_dict, indent=4)
            fit_locations.append(location_dict)
    return fit_locations
        

def filter_date_of_publiction(date_start, date_end):
    fit_articles = []
    mycursor.execute("select * from article where date_of_publication >" + "'%" + date_start + "%'" +"and date_of_publication <" + "'%" + date_end + "%'")
    for x in mycursor:
        #dp = time.strptime(x[2], "time%Y-%m-%d")
        #ds = time.strptime(date_start, "time%Y-%m-%d")
        #de = time.strptime(date_end, "time%Y-%m-%d")
        #print(x)
        article_dict = {'id': x[0], 'headline': x[1], 'date_of_publication': x[2], 'url': x[3], 'main_text': x[4], 'reports': [5]}
        article_dict_json = json.dumps(article_dict, indent=6)
        fit_articles.append(article_dict)
    return fit_articles
        



class Reports_keyterm(Resource):

    #@marshal_with(resource_fields)
    def get(self, key_term):
        #fit_reports = filter_keyterm(key_term, reports)
        #return fit_reports 
        #print(f"key_term is {key_term}")
        result = filter_keyterm(key_term)
        return result 

api.add_resource(Reports_keyterm, "/reports_keyterm/<string:key_term>")


class covid_suggestion(Resource):
    def get(self, country):
        result = covid_filter_country(country)
        return result

api.add_resource(covid_suggestion, "/covid/<string:country>")

class Reports_date(Resource):
    def get(self, date_start, date_end):
        result = filter_date_of_publiction(date_start, date_end)
        return result

api.add_resource(Reports_date, "/reports_date/<string:date_start>/<string:date_end>")




class Reports_combine(Resource):
    def get(self, key_term, place):
        fit_reports = filter_keyterm(key_term, reports)
        fit_reports = filter_place(place, fit_reports)
        return fit_reports  

api.add_resource(Reports_combine, "/reports/<string:key_term>/<string:place>")

class Reports(Resource):
    def get(self):
        fit_articles = []
        mycursor.execute("select * from article")
        for x in mycursor:
            article_dict = {'id': x[0], 'headline': x[1], 'date_of_publication': x[2], 'url': x[3], 'main_text': x[4], 'reports': [5]}
            article_dict_json = json.dumps(article_dict, indent=6)
            fit_articles.append(article_dict)
        return fit_articles

api.add_resource(Reports, "/reports")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)



