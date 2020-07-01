import gensim.downloader as api
from pyemd import emd
from nltk.corpus import stopwords
from nltk import download
import requests
import mysqlhelpers

model = api.load('word2vec-google-news-300') #takes a long time!
download('stopwords')  # Download stopwords list.
stop_words = stopwords.words('english')

def addColumn(table_name, column_title, type):
    try:
        connection.addColumn(table_name, column_title, type)
    except:
        pass

connection = mysqlhelpers.Connect("mydatabase", "wordmovers", "m_1")
connection.dropTB("wordmovers")
connection.createTBWM("wordmovers")
addColumn("wordmovers", "m_1", "INT")
addColumn("wordmovers", "m_2", "INT")
addColumn("wordmovers", "value", "DOUBLE")

def preprocess(sentence):
    return [w for w in sentence.lower().split() if w not in stop_words]

for movie_1 in range(1,2):
    for movie_2 in range(1,4):
        if movie_1 != movie_2:
            sentence_one = requests.get('http://localhost:9000/allsummaries/' + str(movie_1))
            sentence_one = sentence_one.json()[0]['summary']
            sentence_two = requests.get('http://localhost:9000/allsummaries/' + str(movie_2))
            sentence_two = sentence_two.json()[0]['summary']
            first = preprocess(sentence_one)
            second = preprocess(sentence_two)
            distance = model.wmdistance(first, second)

            connection.addWMEntry(str(movie_1), str(movie_2), distance)

connection.printWM()
connection.closeDB()
# first = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency"
# second = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son"
#
# first = preprocess(first)
# second = preprocess(second)
#
# distance = model.wmdistance(first, second)
# print('distance = %.4f' % distance)
