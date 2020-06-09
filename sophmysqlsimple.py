import mysql.connector


class Connect():
    def __init__(self):
        self.connection =  mysql.connector.connect(
            host='localhost',
            user='root',
            password='dalehollow'
            )
        self.cursor = self.connection.cursor()

    def addDB(self):
        self.cursor.execute("CREATE DATABASE IF NOT EXISTS mydatabase")
        self.connection.commit()

    def useDB(self):
    #must use before able to
        self.cursor.execute("USE mydatabase")
        self.connection.commit()

    def createTB(self):
        self.cursor.execute("CREATE TABLE IF NOT EXISTS movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255))")
        self.connection.commit()

    def addColumn(self, column_name, type):
        self.useDB()
        self.cursor.execute("ALTER TABLE movies ADD COLUMN " + column_name + " "+ type)
        self.connection.commit()

    def updateEntry(self, column_name, id, value):
        self.useDB()
        self.cursor.execute("UPDATE movies SET " + column_name + " = '" + value + "' WHERE id = " + str(id))
        self.connection.commit()

    def addData(self, rank, title, year):
        #must have columns already
        self.useDB()
        mySql_insert_query = """INSERT IGNORE INTO movies (id, title, year) VALUES (%s, %s, %s) """
        recordTuple = (rank, title, year)
        self.cursor.execute(mySql_insert_query, recordTuple)
        self.connection.commit()

    def printDB(self):
        self.cursor.execute("SELECT * FROM movies")
        records = self.cursor.fetchall()
        for row in records:
            print(str(row[0])+".", end = " ")
            print(row[1], end = " ")
            print(row[2], end = " ")
            print(row[3], end = " ")
            print(row[4])

    def closeDB(self):
        self.connection.close()
