from bs4 import BeautifulSoup
import requests
import mysqlhelpers

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
                year = year[-5:-1]
                #print(year)
            for y in h_tag.find_all('span',{'class':'lister-item-index'}):
                ranking = y.text
            summary = findSummary(h_tag)
            ranking = ranking[:-1]
            if ranking == "1,000":
                ranking = "1000"
            ranking = int(ranking)
            if ranking > 10:
                connection.printDB()
                quit()
            print("Number:" + str(ranking))
            connection.addEntry(table_name, ranking, title, "title")
            connection.updateEntry(table_name, "year", ranking, year)
            connection.updateEntry(table_name, "summary",ranking, summary)
        #grabbing p tag content
        plist = d_tag.find_all('p', {'class':'text-muted'})
        for p_tag in plist:
            #grabbing rating
            for span in p_tag.find_all('span',{'class':'certificate'}):
                rating = span.text
            #grabbing runtime
            for span in p_tag.find_all('span',{'class':'runtime'}):
                runtime = span.text
                runtime = runtime.replace('min', '')
                runtime = runtime.strip()
                print(runtime)
            #grabbing genres
            for span in p_tag.find_all('span',{'class':'genre'}):
                genres = span.text
            #updating rating, runtime, and genres
            connection.updateEntry(table_name,"rating", ranking, rating)
            connection.updateEntry(table_name,"runtime", ranking, runtime)
            connection.updateEntry(table_name,"genres", ranking, genres)

        #grabbing people from p tag
        people = d_tag.find_all('p',{'class':""})
        for pe_tag in people:
            pe_string = ""
            for y in pe_tag.find_all('a'):
                pe_string += str(y.text) + ', '
            pe_string = pe_string[:-2]
            pe_string = pe_string.replace("'", "")
            connection.updateEntry(table_name, "people", ranking, pe_string)
        #grabbing critic score
        criticScores = d_tag.find_all('strong')
        for score in criticScores:
            critScore = score.text
        connection.updateEntry(table_name, "critic_score", ranking, critScore)
        #grabbing gross box office:
        spans = d_tag.find_all('span',{'name':'nv'})
        for span in spans:
            gross = span.get('data-value')
            gross = gross.replace(',','')
        connection.updateEntry(table_name, "gross", ranking, gross)

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
            if "Previous" not in a_tag.text:
                link = a_tag['href'] #getting value of dictionary key href
                if not link.startswith('http'):
                    link = "https://imdb.com"+link
    # print("link to next page " + strlink)
    return link

def addColumn(table_name, column_title, type):
    try:
        connection.addColumn(table_name, column_title, type)
    except:
        pass

#1000 movies:
# url = 'https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=100&ref_=adv_prv'
#250 movies:
url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")
#constructor: making connect class object.
connection = mysqlhelpers.Connect("mydatabase", "movies", "title")
connection.dropTB("movies")
connection.createTB("movies", "title")

table_name = "movies"
## TODO: make this into a helper
addColumn(table_name, "year", "INT")
addColumn(table_name, "people", "TEXT")
addColumn(table_name, "rating", "VARCHAR(255)")
addColumn(table_name, "critic_score", "FLOAT")
addColumn(table_name, "gross", "INT")
addColumn(table_name, "runtime", "INT")
addColumn(table_name, "genres", "VARCHAR(255)")
addColumn(table_name, "summary", "TEXT")


addToDB()
print("finished first page")
while(getNextLink() != -1):
    url = getNextLink()
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    addToDB()


connection.printDB()
