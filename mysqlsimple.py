import mysql.connector

mydb = mysql.connector.connect(
  host='localhost',
  user='root',
  password='dalehollow'
)

mycursor = mydb.cursor()

mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

mycursor.execute("USE mydatabase")

mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")

mySql_insert_query = """INSERT INTO movies (id, title, year)
                                VALUES (%s, %s, %s) """

recordTuple = (1, 'shawshank redemption', "(1984)")

mycursor.execute(mySql_insert_query, recordTuple)


mycursor.execute("SELECT * FROM movies")

records = mycursor.fetchall()
for row in records:
    print(row[0])
    print(row[1])

mydb.close()
