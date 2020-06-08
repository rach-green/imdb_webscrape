import mysql.connector

def connectToDB():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password='dalehollow'
        )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

    mycursor.execute("USE mydatabase")

    mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")


    mydb.commit()
    return (mycursor, mydb)

def addColumn(column_name, type):
   mydb = mysql.connector.connect(
       host='localhost',
       user='root',
       password='dalehollow'
       )
   mycursor = mydb.cursor()

   mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

   mycursor.execute("USE mydatabase")

   mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")

   mycursor.execute("ALTER TABLE movies ADD COLUMN " + column_name + " "+ type)

   mydb.commit()
   mydb.close()

def updateEntry(column_name, id, value):
   mydb = mysql.connector.connect(
       host='localhost',
       user='root',
       password='dalehollow'
       )
   mycursor = mydb.cursor()

   mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

   mycursor.execute("USE mydatabase")

   mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")

   mycursor.execute("UPDATE movies SET " + column_name + " = '" + value + "' WHERE id = " + str(id))
   mydb.commit()
   mydb.close()


def addRecord(rank, title, year):
   mydb = mysql.connector.connect(
       host='localhost',
       user='root',
       password='dalehollow'
       )

   mycursor = mydb.cursor()

   mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

   mycursor.execute("USE mydatabase")

   mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")

   mySql_insert_query = """INSERT IGNORE INTO movies (id, title, year)
                                   VALUES (%s, %s, %s) """
   recordTuple = (rank, title, year)
   mycursor.execute(mySql_insert_query, recordTuple)
   mydb.commit()
   mydb.close()

def printDB():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password='dalehollow'
        )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

    mycursor.execute("USE mydatabase")

    mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")
    mycursor.execute("SELECT * FROM movies")
    #mydb.commit()

    records = mycursor.fetchall()
    for row in records:
        print(str(row[0])+".", end = " ")
        print(row[1], end = " ")
        print(row[2], end = " ")
        print(row[3], end = " ")
        print(row[4])
    mydb.close()

def closeDB():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password='dalehollow'
        )
    mydb.close()
