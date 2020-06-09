from bs4 import BeautifulSoup
import requests
import sophmysqlsimple

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")
connection = sophmysqlsimple.Connect()

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
    connection.addData(int(ranking[:-1]), title, year)


count = 1
content = soup.find_all('p', {'class':'text-muted'})

try:
    connection.addColumn("rating", "VARCHAR(255)")
except:
    pass

for x in content:
    for y in x.find_all('span',{'class':'certificate'}):
        rating = y.text
        # print(rating)
    connection.updateEntry("rating", count, rating)
    count+=1 #corresponds to ranking

try:
    connection.addColumn("people", "TEXT")
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
    connection.updateEntry("people", count, string)
    count+=1

connection.printDB()

#
# metascores = soup.find_all('span',{'class':'metascore'})
# for x in metascores:
#     print(x.text)
