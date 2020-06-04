from bs4 import BeautifulSoup
import requests

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")

#getting titles of all top_250
llist = soup.find_all('h3',{'class':"lister-item-header"})
for x in llist:
    for y in x.find_all('a'):
        titles = y.text
        print(titles)
    for y in x.find_all('span',{'class':'lister-item-year'}):
        years = y.text
        print(years)
    for y in x.find_all('span',{'class':'lister-item-index'}):
        ranking = y.text
        print(ranking)


content = soup.find_all('p', {'class':'text-muted'})
for x in content:
    for y in x.find_all('span',{'class':'certificate'}):
        ratings = y.text
        print(ratings)

people = soup.find_all('p',{'class':""})
for x in people:
    for y in x.find_all('a'): #think about adding span for director/actor
            people = y.text
            print(people)

metascores = soup.find_all('span',{'class':'metascore'})
for x in metascores:
    print(x.text)
