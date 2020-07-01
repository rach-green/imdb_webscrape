import gensim.downloader as api
from pyemd import emd
from nltk.corpus import stopwords
from nltk import download


model = api.load('word2vec-google-news-300') #takes a long time!
download('stopwords')  # Download stopwords list.
stop_words = stopwords.words('english')

def preprocess(sentence):
    return [w for w in sentence.lower().split() if w not in stop_words]

first = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency"
second = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son"

first = preprocess(first)
second = preprocess(second)

distance = model.wmdistance(first, second)
print('distance = %.4f' % distance)
