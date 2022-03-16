
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/")
def hello_world(): 
    return "<p>Hello, World!</p>"

@app.route('/name', methods=['GET', 'POST'])
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
        