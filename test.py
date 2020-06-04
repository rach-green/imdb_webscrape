from bs4 import BeautifulSoup
import requests

url = 'https://www.imdb.com/search/title/?groups=top_250&sort=user_rating'
resp = requests.get(url)
