import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, request, redirect, jsonify, render_template
from flask_pymongo import MongoClient
from request import process
import os
import pymongo

from flask import send_from_directory
#from flask_sqlalchemy import SQLAlchemy
#import pymysql

app = Flask(__name__)
#url = os.environ['MONGODB_URI']

#client = MongoClient(url)
conn = 'mongodb://localhost:27017'
client = MongoClient(conn)
#client = pymongo.MongoClient(conn)
db = client['sb']

# Create a connection to the MySQL database
#def create_connection():
#    return pymysql.connect("localhost", "golivera", "golivera", "indeed_db").cursor()
#    return pymysql.connect("localhost", "golivera", f"{password}", "bart_db").cursor()

#################################################
# Database Setup
#################################################

#app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
#app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/bellybutton.sqlite"
#app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', '')
rds_connection_string = "golivera:golivera@127.0.0.1/indeed_db?charset=utf8"
engine = create_engine(f'mysql://{rds_connection_string}', encoding = 'utf-8')

#db2 = SQLAlchemy(app)

# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(db.engine, reflect=True)

# Save references to each table
#Samples_Metadata = Base.classes.sample_metadata
#Samples = Base.classes.samples



@app.route('/')
def main_chick():
    sb = db.sb.find_one()
    return render_template('index.html', sb=sb)

@app.route('/data')
def data():
    #cursor = create_connection()

    
    sql = "SELECT r.category, r.employer, r.jobtitle, r.latitude, r.longitude FROM metadata as r"
    #df = pd.read_sql_query(sql, con=engine).head()
    #cursor.execute(sql)
    connection = engine.connect()
    cursor = connection.execute(sql)

    # gets the column headers in the merged table
    #columns = [col[0] for col in cursor.description] 
    columns = cursor.keys()

    # output is a list of dictionaries (key: column header, value: data)
    results = [dict(zip(columns, row)) for row in cursor.fetchall()] 
    #return jsonify(json_list=[i.serialize for i in qryresult.all()])

    # json format for list of dictionaries
    return jsonify (results)
 

@app.route('/sb_request', methods=['POST'])
def side_chick():
    if request.method == 'POST':
        geo = request.form['geo']
        # addy = request.form['addy']
        # processed_addy = addy.lower()

        sb = db.sb
        data = process(geo)
        sb.update({}, data, upsert=True)

        print (data)
        return redirect("/", code=302)
    else:
        print('nope')
        return redirect("/", code=302)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run()
