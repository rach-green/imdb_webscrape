from bs4 import BeautifulSoup
import requests

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, features = "lxml")

#getting titles of all top_250
llist = soup.find_all('h3',{'class':'list-item-header'})
for x in llist:
    for y in x.find_all('a'):
        print(y.text)
