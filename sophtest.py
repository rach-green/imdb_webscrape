from bs4 import BeautifulSoup
import requests
import sophmysqlsimple

def addToDB():
    dlist = soup.find_all('div',{'class':"lister-item-content"})
    print("Dlist length: " + str(len(dlist)))
    for d_tag in dlist:
        ranking = -1
        print("Ranking at top of loop:" + str(ranking))
        #grabbing h3 tag content
        hlist = d_tag.find_all('h3',{'class':"lister-item-header"})
        for h_tag in hlist:
            for y in h_tag.find_all('a'):
                title = y.text
                #print(title)
            for y in h_tag.find_all('span',{'class':'lister-item-year'}):
                year = y.text
                #print(year)
            for y in h_tag.find_all('span',{'class':'lister-item-index'}):
                ranking = y.text
            summary = findSummary(h_tag)
            ranking = int(ranking[:-1])
            print("Number:" + str(ranking))
            connection.addEntry(table_name, ranking, title, "title")
            connection.updateEntry(table_name, "year", ranking, year)
            connection.updateEntry(table_name, "summary",ranking, summary)
        #grabbing p tag content
        plist = soup.find_all('p', {'class':'text-muted'})
        for p_tag in plist:
            for y in p_tag.find_all('span',{'class':'certificate'}):
                rating = y.text
            connection.updateEntry(table_name,"rating", ranking, rating)
        #grabbing people from p tag
        people = soup.find_all('p',{'class':""})
        for pe_tag in people:
            pe_string = ""
            for y in pe_tag.find_all('a'):
                pe_string += str(y.text) + ', '
            pe_string = pe_string[:-2]
            pe_string = pe_string.replace("'", "")
            connection.updateEntry(table_name, "people", ranking, pe_string)

def findUrl(h_tag):
    for a_tag in h_tag.find_all('a'): #a_tag is a dictionary of a specific movie
        url = a_tag['href'] #getting value of dictionary key href
        if not url.startswith('http'):
            url = "https://imdb.com"+url
    return url

def findSummary(h_tag):
    url = findUrl(h_tag)
    # print("Summary url: " + url)
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    summaries = soup.find_all('div', {'class':"summary_text"})
    #will only iterate once
    summary = "NONE"
    for s in summaries:
        summary = (s.text).replace("\n", "")
        summary = summary.replace("'", "`")
        summary = summary.strip()
    return summary

def getNextLink():
    pglink = soup.find_all('div',{'class':"desc"})
    link = -1
    for x in pglink:
        for a_tag in x.find_all('a'): #a_tag is a dictionary of a specific movie
            if a_tag.text != "Previous":
                link = a_tag['href'] #getting value of dictionary key href
                if not link.startswith('http'):
                    link = "https://imdb.com"+link
    print("link to next page " + link)
    return link

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")
#constructor: making connect class object.
connection = sophmysqlsimple.Connect("mydatabase", "movies", "title")
connection.dropTB("movies")
connection.createTB("movies", "title")

table_name = "movies"
## TODO: make this into a helper
try:
    connection.addColumn(table_name, "year", "VARCHAR(255)")
except:
    pass
try:
    connection.addColumn(table_name, "people", "TEXT")
except:
    pass
try:
    connection.addColumn(table_name, "rating", "VARCHAR(255)")
except:
    pass
try:
    connection.addColumn(table_name, "summary", "TEXT")
except:
    pass

addToDB()
print("finished first page")
while(getNextLink() != -1):
    url = getNextLink()
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    addToDB()


connection.printDB()
