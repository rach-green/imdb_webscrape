from bs4 import BeautifulSoup
import requests
import mysqlsimple
import testwithcrawl

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")
addToDB()
while(testwithcrawl.getNextLink() != -1):
    url = testwithcrawl.getNextLink()
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    addToDB()

def addToDB():
    #getting titles of all top_250
    llist = soup.find_all('h3',{'class':"lister-item-header"})
    #x is an inidividual movie
    for x in llist:
        for y in x.find_all('a'):
            title = y.text
            #print(title)
        for y in x.find_all('span',{'class':'lister-item-year'}):
            year = y.text
            #print(year)
        for y in x.find_all('span',{'class':'lister-item-index'}):
            ranking = y.text
            #print(ranking)
        mysqlsimple.addRecord(int(ranking[:-1]), title, year)


    count = 1
    content = soup.find_all('p', {'class':'text-muted'})

    try:
        mysqlsimple.addColumn("rating", "VARCHAR(255)")
    except:
        pass

    for x in content:
        for y in x.find_all('span',{'class':'certificate'}):
            rating = y.text
            # print(rating)
        mysqlsimple.updateEntry("rating", count, rating)
        count+=1 #corresponds to ranking

    try:
        mysqlsimple.addColumn("people", "TEXT")
    except:
        pass

    count = 1
    people = soup.find_all('p',{'class':""})
    for x in people:
        string = ""
        for y in x.find_all('a'):
            string += str(y.text) + ', '
        string = string[:-2]
        string = string.replace("'", "")
        mysqlsimple.updateEntry("people", count, string)
        count+=1

    #
    # metascores = soup.find_all('span',{'class':'metascore'})
    # for x in metascores:
    #     print(x.text)

    try:
        mysqlsimple.addColumn("summaries", "TEXT")
    except:
        pass

    # summaries = testwithcrawl.findSummaries()
    # count = 1
    # for x in summaries:
    #     string = x.replace("'", "")
    #     mysqlsimple.updateEntry("summaries", count, string)
    #     count+=1

mysqlsimple.printDB()
