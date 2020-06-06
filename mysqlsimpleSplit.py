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

def addRecord(rank, title, year, mycursor, mydb):
   # mydb = mysql.connector.connect(
   #     host='localhost',
   #     user='root',
   #     password='dalehollow'
   #     )
   #
   # mycursor = mydb.cursor()
   #
   # mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")
   #
   # mycursor.execute("USE mydatabase")
   #
   # mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")

   mySql_insert_query = """INSERT IGNORE INTO movies (id, title, year)
                                   VALUES (%s, %s, %s) """
   recordTuple = (rank, title, year)
   mycursor.execute(mySql_insert_query, recordTuple)
   mydb.commit()
   #mydb.close()

def printDB(mydb, mycursor):
    # mydb = mysql.connector.connect(
    #     host='localhost',
    #     user='root',
    #     password='dalehollow'
    #     )
    #
    # mycursor = mydb.cursor()
    #
    # mycursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")
    #
    # mycursor.execute("USE mydatabase")
    #
    # mycursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")
    mycursor.execute("SELECT * FROM movies")
    #mydb.commit()

    records = mycursor.fetchall()
    for row in records:
        print(row[0], end = '')
        print(". ", end = '')
        print(row[1])
    #mydb.close()

def closeDB(mydb):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password='dalehollow'
        )
    mydb.close()
