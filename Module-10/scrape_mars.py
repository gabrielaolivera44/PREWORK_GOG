# coding: utf-8
# # Mission to Mars
# ## Step 1 - Scraping
# In[ ]:

from bs4 import BeautifulSoup
import requests
from splinter import Browser
import pandas as pd

def scrape():
    mars_results = {}

    # ## NASA Mars News
    # In[3]:
    executable_path = {'executable_path': './chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)
    
    news_url = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    browser.visit(news_url)
    while not browser.is_element_present_by_tag("li", wait_time=25):
        pass
    
    
    # In[5]:
    
    
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #print(soup.prettify())
    
    
    # In[6]:
    
    
    news_title = soup.find("li", class_="slide").find("div", class_="content_title").text
    #print(news_title)
    news_p = soup.find("li", class_="slide").find("div", class_="article_teaser_body").text
    #print(news_p)
    
    
    # ## JPL Mars Space Images - Featured Image
    
    # In[7]:
    
    
    jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(jpl_url)
    while not browser.is_element_present_by_tag("li", wait_time=25):
        pass
    
    
    # In[8]:
    
    
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #print(soup.prettify())
    
    
    # In[13]:
    
    
    featured_img_base = "https://www.jpl.nasa.gov"
    featured_img_url_raw = soup.find("div", class_="carousel_items").find("article")["style"]
    featured_img_url_raw
    featured_img_url = featured_img_url_raw.split("'")[1]
    featured_img_url = featured_img_base + featured_img_url
    featured_img_url
    
    
    # ### Mars Weather
    
    # In[15]:
    
    
    # https://twitter.com/marswxreport?lang=en
    weather_twitter_url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(weather_twitter_url)
    
    while not browser.is_element_present_by_tag("li", wait_time=25):
        pass
    
    
    # In[16]:
    
    
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #print(soup.prettify())
    
    
    # In[17]:
    
    
    tweets = soup.find("div", class_="stream").find("ol").find_all("li", class_="js-stream-item")
    for tweet in tweets:
        tweet_text = tweet.find("div", class_="js-tweet-text-container").text
        if "Sol " in tweet_text:
            mars_weather = tweet_text.strip()
            break
            
    mars_weather
    
    
    # ### Mars Facts
    
    # In[30]:
    
    
    # https://space-facts.com/mars/
    mars_fact_url = "https://space-facts.com/mars/"
    browser.visit(mars_fact_url)
    while not browser.is_element_present_by_tag("li", wait_time=25):
        pass
    
    
    # In[34]:
    
    
    mars_fact_url = "https://space-facts.com/mars/"
    mars_fact_table = pd.read_html(mars_fact_url)
    mars_fact_table
    
    mars_fact_df = mars_fact_table[0]
    mars_fact_df.columns = ["Fact","Value"]
    
    mars_fact_df["Fact"] = mars_fact_df["Fact"].str[:-1]
    mars_fact_df = mars_fact_df.set_index("Fact")
    mars_fact_df
    
    
    # In[38]:
    
    
    mars_fact_html = mars_fact_df.to_html()
    #mars_fact_html = mars_fact_html.replace('\n', '')
    mars_fact_html
    
    
    # ### Mars Hemispheres
    
    # In[75]:
    
    
    #executable_path = {'executable_path': './chromedriver'}
    #browser = Browser('chrome', **executable_path, headless=False)
    
    # https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars
    hemisphere_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(hemisphere_url)
    while not browser.is_element_present_by_tag("li", wait_time=25):
        pass
    
    
    # In[78]:
    
    
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    soup
    
    
    # In[79]:
    
    
    hemisphere_image_urls = []
    
    links = soup.find_all("div", class_="item")
    #print(links)
    
    
    # In[81]:
    
    
    ##html = browser.html
    ##soup = BeautifulSoup(html, 'html.parser')
        
    hemisphere_image_urls = []
    
    links = soup.find_all("div", class_="item")
    #print(links)
    
    for link in links:
        img_dict = {}
        title = link.find("h3").text
        next_link = link.find("div", class_="description").a["href"]
        full_next_link = "https://astrogeology.usgs.gov" + next_link
        
        browser.visit(full_next_link)
        while not browser.is_element_present_by_tag("li", wait_time=25):
            pass
        
        pic_html = browser.html
        pic_soup = BeautifulSoup(pic_html, 'html.parser')
        
        url = pic_soup.find("img", class_="wide-image")["src"]

        img_dict["title"] = title
        img_dict["img_url"] = "https://astrogeology.usgs.gov" + url
        #print(img_dict["img_url"])
    
        hemisphere_image_urls.append(img_dict)

    #print(hemisphere_image_urls)


    # In[83]:
    

    #hemisphere_image_urls
    mars_results["hemisphere_image_urls"] = hemisphere_image_urls

    return mars_results

