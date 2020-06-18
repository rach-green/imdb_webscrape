from bs4 import BeautifulSoup
import requests
import mysqlhelpers


######################### HELPER FUNCTIONS FOR addDB() #########################
def addEntry(h_tag):
    for y in h_tag.find_all('span',{'class':'lister-item-index'}):
        ranking = y.text
    ranking = ranking[:-1]
    if ranking == "1,000":
        ranking = "1000"
    ranking = int(ranking)
    # if ranking > 3:
    #     connection.printDB()
    #     quit()
    for y in h_tag.find_all('a'):
        title = y.text
    connection.addEntry(table_name, ranking, title, "title")
    return ranking

def addYear(ranking, h_tag):
    for y in h_tag.find_all('span',{'class':'lister-item-year'}):
        year = y.text
        year = year[-5:-1]
        #print(year)
    connection.updateEntry(table_name, "year", ranking, year)

def addRating(ranking, p_tag):
    for span in p_tag.find_all('span',{'class':'certificate'}):
        rating = span.text
        connection.updateEntry(table_name,"rating", ranking, rating)

def addRuntime(ranking, p_tag):
    for span in p_tag.find_all('span',{'class':'runtime'}):
        runtime = span.text
        runtime = runtime.replace('min', '')
        runtime = runtime.strip()
        connection.updateEntry(table_name,"runtime", ranking, runtime)

def addGenres(ranking, p_tag):
    for span in p_tag.find_all('span',{'class':'genre'}):
        genres = span.text
        genres = genres.strip()
        genres = genres.replace("'", "`")
        connection.updateEntry(table_name,"genres", ranking, genres)

def addPeople(ranking, d_tag):
    plist= d_tag.find_all('p',{'class':""})
    for pe_tag in plist:
        pe_string = ""
        for y in pe_tag.find_all('a'):
            pe_string += str(y.text) + ', '
        pe_string = pe_string[:-2]
        pe_string = pe_string.replace("'", "`")
        connection.updateEntry(table_name, "people", ranking, pe_string)

def addScore(ranking, d_tag):
    criticScores = d_tag.find_all('strong')
    for score in criticScores:
        critScore = score.text
    connection.updateEntry(table_name, "critic_score", ranking, critScore)

def addGross(ranking, d_tag):
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

################# HELPER FUNCTIONS FOR scrapeMoviePage() ######################
def addSummary(ranking, soup):
    summaries = soup.find_all('div', {'class':"summary_text"})
    #will only iterate once
    summary = "NONE"
    for s in summaries:
        summary = (s.text).replace("\n", "")
        summary = summary.replace("'", "`")
        summary = summary.strip()
    connection.updateEntry(table_name, "summary", ranking, summary)

def addProducers(ranking, soup):
    divs = soup.find_all('div', {'class':"credit_summary_item"})
    for div in divs:
        h4s = div.find_all('h4')
        for h4 in h4s:
            if "Director" in h4.text:
                directors = ""
                for a in div.find_all('a'):
                    directors += a.text + ", "
                directors = directors[:-2]
                directors = directors.replace("'", "`")
                connection.updateEntry(table_name, "directors", ranking, directors)
            if "Writer" in h4.text:
                writers = ""
                for a in div.find_all('a'):
                    if "credit" not in a.text:
                        writers += a.text + ", "
                writers = writers[:-2]
                writers = writers.replace("'", "`")
                connection.updateEntry(table_name, "writers", ranking, writers)

def addCast(ranking, soup):
    cast = ""
    for table in soup.find_all('table', {'class':"cast_list"}):
        for tr in table.find_all('tr'):
            if tr.get('class') != 'castlist_label':
                for td in tr.find_all('td'):
                    if not td.has_attr('class'):
                        for a in td.find_all('a'):
                            cast += a.text.rstrip().strip() + ", "
    cast = cast[:-2]
    cast = cast.replace("'",'`')
    connection.updateEntry(table_name, "cast", ranking, cast)

def addStoryline(ranking, soup):
    for div in soup.find_all('div',{'id':'titleStoryLine'}):
        for p in div.find_all('p'):
            for span in p.find_all('span'):
                storyline = span.text
                storyline = storyline.replace("'","`")
                storyline = storyline.strip().rstrip()
                connection.updateEntry(table_name, "storyline", ranking, storyline)
                return

def addBudget(ranking, soup):
    for div in soup.find_all('div',{'id':'titleDetails'}):
        for div2 in div.find_all('div',{'class':'txt-block'}):
            for h4 in div2.find_all('h4'):
                if "Budget" in h4.text:
                    budget = div2.contents[2]
                    budget = budget.replace('$','')
                    budget = budget.replace(',','')
                    try:
                        int(budget)
                    except:
                        budget = 'NULL' #maybe convert currency later
                    connection.updateEntry(table_name, "budget", ranking, budget)
                    return

def addLanguages(ranking, soup):
    languages = ""
    for div in soup.find_all('div',{'id':'titleDetails'}):
        for div2 in div.find_all('div',{'class':'txt-block'}):
            for h4 in div2.find_all('h4'):
                if "Language" in h4.text:
                    for a in div2.find_all('a'):
                        languages += a.text + ", "
                    languages = languages[:-2]
                    languages = languages.replace("'", "`")
                    connection.updateEntry(table_name, "languages", ranking, languages)
                    return


######################### OTHER HELPERS ########################################

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

######################### END OF HELPERS #####################################
def scrapeMoviePage(url, ranking):
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    addSummary(ranking, soup)
    addProducers(ranking, soup)
    addCast(ranking, soup)
    addBudget(ranking, soup)
    addLanguages(ranking, soup)
    addStoryline(ranking, soup)

def addToDB():
    dlist = soup.find_all('div',{'class':"lister-item-content"})
    for d_tag in dlist:
        ranking = -1
        url = -1
        #grabbing h3 tag content
        hlist = d_tag.find_all('h3',{'class':"lister-item-header"})
        for h_tag in hlist:
            ranking = addEntry(h_tag)
            print("Number: "+ str(ranking))
            addYear(ranking, h_tag)
            url = findUrl(h_tag)
        #grabbing p tag content
        plist = d_tag.find_all('p', {'class':'text-muted'})
        for p_tag in plist:
            addRating(ranking, p_tag)
            addRuntime(ranking, p_tag)
            addGenres(ranking, p_tag)
        addScore(ranking, d_tag)
        # addPeople(ranking, d_tag)
        addGross(ranking, d_tag)
        scrapeMoviePage(url, ranking)


#1000 movies:
url = 'https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=100&ref_=adv_prv'
#250 movies:
# url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")
#constructor: making connect class object.
connection = mysqlhelpers.Connect("mydatabase", "movies", "title")
connection.dropTB("movies")
connection.createTB("movies", "title")

table_name = "movies"
## TODO: make this into a helper
addColumn(table_name, "year", "INT")
# addColumn(table_name, "people", "TEXT")
addColumn(table_name, "rating", "VARCHAR(255)")
addColumn(table_name, "critic_score", "FLOAT")
addColumn(table_name, "gross", "INT")
addColumn(table_name, "runtime", "INT")
addColumn(table_name, "genres", "VARCHAR(255)")
addColumn(table_name, "summary", "TEXT")
addColumn(table_name, "directors", "TEXT")
addColumn(table_name, "writers", "TEXT")
addColumn(table_name, "cast", "TEXT")
addColumn(table_name, "budget", "INT")
addColumn(table_name, "languages", "VARCHAR(255)")
addColumn(table_name, "storyline", "TEXT")

addToDB()
while(getNextLink() != -1):
    url = getNextLink()
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    addToDB()


# connection.printDB()
