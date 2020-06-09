from bs4 import BeautifulSoup
import requests
import sophmysqlsimple

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")
#constructor: making connect class object.
connection = sophmysqlsimple.Connect("mydatabase")
addToDB()
## TODO: rethink logic of this
while(testwithcrawl.getNextLink() != -1):
    url = testwithcrawl.getNextLink()
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, features = "lxml")
    addToDB()

def addToDB():
    dlist = soup.find_all('div',{'class':"lister-item-content"})
    for d_tag in dlist:
        #grabbing h3 tag content
        hlist = soup.find_all('h3',{'class':"lister-item-header"})
        for h_tag in hlist:
            for y in h_tag.find_all('a'):
                title = y.text
                #print(title)
            for y in h_tag.find_all('span',{'class':'lister-item-year'}):
                year = y.text
                #print(year)
            for y in h_tag.find_all('span',{'class':'lister-item-index'}):
                ranking = y.text
                #print(ranking)
            connection.addData(int(ranking[:-1]), title, year)## TODO: MAKE ENTRY AND GENERIC
        #grabbing p tag content
        plist = soup.find_all('p', {'class':'text-muted'})
        # try:
        #     connection.addColumn("rating", "VARCHAR(255)")
        # except:
        #     pass

        for p_tag in plist:
            for y in p_tag.find_all('span',{'class':'certificate'}):
                rating = y.text
                # print(rating)
            connection.updateEntry("rating", count, rating)


        # try:
        #     connection.addColumn("people", "TEXT")
        # except:
        #     pass
        #

        people = soup.find_all('p',{'class':""})
        for pe_tag in people:
            string = ""
            for y in pe_tag.find_all('a'):
                string += str(y.text) + ', '
            string = string[:-2]
            string = string.replace("'", "")
            connection.updateEntry("people", count, string)

connection.printDB()

#
# metascores = soup.find_all('span',{'class':'metascore'})
# for x in metascores:
#     print(x.text)
