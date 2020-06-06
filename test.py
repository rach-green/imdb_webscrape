from bs4 import BeautifulSoup
import requests
import mysqlsimple

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")

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
#mysqlsimple.addColumn("rating")
for x in content:
    for y in x.find_all('span',{'class':'certificate'}):
        rating = y.text
        # print(rating)
    mysqlsimple.updateEntry("rating", count, rating)
    count+=1

mysqlsimple.printDB()

# people = soup.find_all('p',{'class':""})
# for x in people:
#     for y in x.find_all('a'): #think about adding span for director/actor
#             people = y.text
#             print(people)
#
# metascores = soup.find_all('span',{'class':'metascore'})
# for x in metascores:
#     print(x.text)
