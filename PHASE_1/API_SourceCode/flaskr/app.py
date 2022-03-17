#from asyncio.windows_events import NULL
import os

from flask import Flask
from flask import request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

import re
from datetime import datetime
import pymysql
import secrets


# create and configure the app
conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format('admin', 'letsgethd', 'database-1.ctn2lesi9qqn.us-east-1.rds.amazonaws.com', 'backup')
app = Flask(__name__, instance_relative_config=True)
api = Api(app)

app.config['SECRET_KEY'] = 'SuperSecretKey'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
db = SQLAlchemy(app)

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

'''
@app.route("/hello")
def hello_world(): 
    return "<p>Hello, World!</p>"

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
resource_fields = {
        'id': fields.Integer,
        'url': fields.String,
        'date_of_publiction': fields.String,
        'headline': fields.String,
        'main_text': fields.String, 
        'reports': fields.String
}


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100))
    date_of_publication = db.Column(db.String(100))
    headline = db.Column(db.String(100))
    main_text = db.Column(db.String(100))
    reports = db.Column(db.String(100))

    def __repr__(self):
        return f"Article(url = {url}, date_of_publication = {date_of_publication}, headline = {headline}, main_text = {main_text}, reports = {reports})"
        #return "id: {0} | url: {1} | date_of_publication: {2} | headline: {3} | main_text: {4} | reports: {5}".format(self.id, self.url, self.date_of_publication, self.headline, self.main_text, self.reports)
##this part is just for test

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

class Reports_keyterm(Resource):

    @marshal_with(resource_fields)
    def get(self, key_term):
        #fit_reports = filter_keyterm(key_term, reports)
        #return fit_reports 
        result = Article.query.get(url=key_term) 
        return result 

api.add_resource(Reports_keyterm, "/reports_keyterm/<string:key_term>")



class Reports_combine(Resource):
    def get(self, key_term, place):
        fit_reports = filter_keyterm(key_term, reports)
        fit_reports = filter_place(place, fit_reports)
        return fit_reports  

api.add_resource(Reports_combine, "/reports/<string:key_term>/<string:place>")



if __name__ == "__main__":
    app.run(debug=True)



