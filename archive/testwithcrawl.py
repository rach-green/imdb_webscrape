from bs4 import BeautifulSoup
import requests
import mysqlsimple

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")

#an array of movie summaries
#summs = []
#an array of movie detail URLS
#urls = []

def findUrls():
    #getting titles of all top_250
    urls = []
    url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    llist = soup.find_all('h3',{'class':"lister-item-header"})
    #getting all movie detail urls
    for x in llist: #iterating through all movies
        for a_tag in x.find_all('a'): #a_tag is a dictionary of a specific movie
            url = a_tag['href'] #getting value of dictionary key href
            if not url.startswith('http'):
                url = "https://imdb.com"+url
            urls.append(url) #url to movie details
    return urls

def findSummaries():
    urls = findUrls()
    summs = []
    for url in urls:
        resp = requests.get(url)
        soup = BeautifulSoup(resp.text, features = "lxml")
        summaries = soup.find_all('div', {'class':"summary_text"})
        for x in summaries:
            summary = (x.text).replace("\n", "")
            summary = summary.strip()
            summs.append(summary)
    #print(summs)
    return summs

def getNextLink():
    url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    pglink = soup.find_all('div',{'class':"desc"})
    link = -1
    for x in pglink:
        for a_tag in x.find_all('a'): #a_tag is a dictionary of a specific movie
            if a_tag.text != "Previous":
                link = a_tag['href'] #getting value of dictionary key href
                if not link.startswith('http'):
                    link = "https://imdb.com"+link
    return link

# def nextPage():
#     url = getNextLink()
#     resp = requests.get(url)
#     soup = BeautifulSoup(resp.text, features = "lxml")
