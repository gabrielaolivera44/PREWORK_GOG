from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import mission_to_mars

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/craigslist_app")

@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    #return "Welcome to my 'Home' page!"
    mars_data = mongo.db.mars.find_one()
    return render_template("index.html", mars_data=mars_data)
    #return "Welcome to my 'Home' page!"

@app.route("/scrape")
def scraper():
    print("Server received request for 'Home' page...")
    #return "Welcome to my 'Home' page!"
    mars = mongo.db.mars
    #mars_data = scrape_mars.scrape()
    mars_data = mission_to_mars.scrape()
    mars.update({}, mars_data, upsert=True)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)
