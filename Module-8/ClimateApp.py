from datetime import datetime
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to the measurement and station tables
Measurement=Base.classes.measurement
Station=Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all routes that are available.<br/><br/>"""
    return (
        f"<pre>Available Routes:</pre><br/>"
        f"<pre>/api/v1.0/precipitation&#9;-&#9;The dates and precipitation observations from the last year</pre>"
        #f"/api/v1.0/stations"
        f"<pre>/api/v1.0/stations&#9;-&#9;List of stations from the dataset</pre>"
        #f"/api/v1.0/tobs"
        f"<pre>/api/v1.0/tobs&#9;&#9;-&#9;List of Temperature Observations (tobs) from a year from the last data point.</pre>"
        #f"/api/v1.0/&lt;START&gt;"
        f"<pre>/api/v1.0/&lt;START&gt;&#9;-&#9;List of TMIN, TAVG, and TMAX group by all dates greater than and equal to the start date (date format:d-m-Y)</pre>"
        #f"/api/v1.0/&lt;START&gt;/&lt;END&gt;"
        f"<pre>/api/v1.0/&lt;START&gt;/&lt;END&gt;&#9;-&#9;The TMIN, TAVG, and TMAX group by dates between the start and end date inclusive (date format:d-m-Y)</pre>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return a list of dates and precipitation observations"""
    # Query all dates and precipitation observations last year from the measurement table
    
    prcp_results = session.query(Measurement.date, Measurement.prcp).\
                   filter(Measurement.date.between('2016-08-01', '2017-08-01')).all()

    precipitation= []
    for result in prcp_results:
        row = {"date":"prcp"}
        row["date"] = result[0]
        row["prcp"] = float(result[1])
        precipitation.append(row)

    return jsonify(precipitation)


@app.route("/api/v1.0/stations")
def stations():
   
    # Query all stations from the station table
    station_results = session.query(Station.station, Station.name).group_by(Station.station).all()

    station_list = list(np.ravel(station_results))
    return jsonify(station_list)


@app.route("/api/v1.0/tobs")
def tobs():
    tobs_results = session.query(Measurement.station, Measurement.tobs).filter(Measurement.date.between('2016-08-01', '2017-08-01')).all()
   
    tobs_list=[]
    for tobs in tobs_results:
        tobs_dict = {}
        tobs_dict["station"] = tobs[0]
        tobs_dict["tobs"] = float(tobs[1])
       
        tobs_list.append(tobs_dict)
    return jsonify(tobs_list)

@app.route("/api/v1.0/<start>")
def calc_temps(start='start_date'):
    start_date = datetime.strptime(start, '%d-%m-%Y').date()

    start_results = session.query(Measurement.date, \
                            func.max(Measurement.tobs), \
                            func.min(Measurement.tobs),\
                            func.avg(Measurement.tobs)).\
                            filter(Measurement.date >= start_date). \
                            group_by(Measurement.date).all() 
    start_tobs=list(start_results)
    return jsonify(start_tobs)


@app.route("/api/v1.0/<start>/<end>")
def calc_temps_2(start='start_date', end='end_date'):      

    start_date = datetime.strptime(start, '%d-%m-%Y').date()
    end_date = datetime.strptime(end, '%d-%m-%Y').date()

    start_end_results=session.query(Measurement.date, \
                      func.max(Measurement.tobs).label("max_tobs"), \
                      func.min(Measurement.tobs).label("min_tobs"),\
                      func.avg(Measurement.tobs).label("avg_tobs")).\
                      filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).\
                      group_by(Measurement.date)

    start_end_tobs=list(start_end_results)
    return jsonify(start_end_tobs)

if __name__ == '__main__':
	app.run(debug=True)