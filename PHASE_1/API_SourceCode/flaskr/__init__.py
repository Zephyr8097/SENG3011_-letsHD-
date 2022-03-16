#from asyncio.windows_events import NULL
import os

from flask import Flask
from flask import request
from flask_restful import Api, Resource, reqparse, abort
from flask_sqlalchemy import SQLAlchemy
import data
import re

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    api = Api(app)
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


   
    ##this part is just for test
    
    results = {"1": {"url": "www.cdc.com", "date": "2022-01006T00:00:00"}, "2": {"url": "www.google.com", "date": "2021-01006T00:00:00"}}
    
    def abort_if_result_id_invalid(result_id):
        if result_id not in results:
            abort(404, message="result is not valid")

    class Results(Resource):
        def get(self, result_id):
            abort_if_result_id_invalid(result_id)
            return results[result_id]
    

    api.add_resource(Results, "/results/<string:result_id>")

   
    reports = data.reports
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
    
    def filter_keyword(key_word, pre_reports):
        fit_reports = []
        if key_word is not None:
            for report in reports:
                match_string = report['title']
                match_string = match_string.lower()
                key_word = key_word.lower()
                if match_string.find(key_word) != -1:
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
                    if place.upper() in detail['location'] and report not in fit_reports:

                        fit_reports.append(report)
        else:
            fit_reports = pre_reports
        return fit_reports

    #get the list of all reports
    class Reports(Resource):
        def get(self):
            return reports
    
    api.add_resource(Reports, "/reports")
                
              
    class Reports_keyword(Resource):
        def get(self, key_word):
            fit_reports = filter_keyword(key_word, reports)
            return fit_reports  

    api.add_resource(Reports_keyword, "/reports_keyword/<string:key_word>")



    class Reports_combine(Resource):
        def get(self, key_word, place):
            fit_reports = filter_keyword(key_word, reports)
            fit_reports = filter_place(place, fit_reports)
            return fit_reports  

    api.add_resource(Reports_combine, "/reports/<string:key_word>/<string:place>")

    if __name__ == "__main__":
        app.run(debug=True)

    return app

