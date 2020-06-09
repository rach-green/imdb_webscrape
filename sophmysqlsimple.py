import mysql.connector


class Connect():
    def __init__(self, db_name, table_name, column_name):
        self.connection =  mysql.connector.connect(
            host='localhost',
            user='root',
            password='dalehollow'
            )
        self.cursor = self.connection.cursor()
        self.addDB(db_name)
        self.db = db_name
        self.createTB(table_name, column_name)

    def changeDB(self, db_name):
        self.cursor.execute("CREATE DATABASE IF NOT EXISTS " + db_name)
        self.db = db_name
        self.connection.commit()

    def addDB(self, db_name):
        self.cursor.execute("CREATE DATABASE IF NOT EXISTS " + db_name)
        self.connection.commit()

    def useDB(self):
    #must use before able to
        self.cursor.execute("USE " + self.db)
        self.connection.commit()

    def createTB(self, table_name, column_name):
        self.useDB()
        self.cursor.execute("CREATE TABLE IF NOT EXISTS " + table_name + " (id INT AUTO_INCREMENT PRIMARY KEY, " + column_name +" VARCHAR(255))")
        self.connection.commit()

    def addColumn(self, table_name, column_name, type):
        self.useDB()
        self.cursor.execute("ALTER TABLE " + table_name + " ADD COLUMN " + column_name + " "+ type)
        self.connection.commit()
    #single insert of data into the table
    def updateEntry(self, table_name, column_name, id, value):
        self.useDB()
        self.cursor.execute("UPDATE " + table_name + " SET " + column_name + " = '" + value + "' WHERE id = " + str(id))
        self.connection.commit()

    #adding an entry to the table
    def addEntry(self, table_name, id, column_content, column_name):
        #must have columns already
        self.useDB()
        # mySql_insert_query = """INSERT IGNORE INTO movies (id, " + column_name VALUES (%s, %s) """
        recordTuple = (id, column_content)
        self.cursor.execute("INSERT IGNORE INTO " + table_name + " (id, " + column_name + ") VALUES (%s, %s) ", recordTuple)
        self.connection.commit()

    def printDB(self):
        self.useDB()
        self.cursor.execute("SELECT * FROM movies")
        records = self.cursor.fetchall()
        for row in records:
            print(str(row[0])+".", end = " ")
            print(row[1], end = " ")
            print(row[2], end = " ")
            print(row[3], end = " ")
            print(row[4])

    def closeDB(self):
        self.useDB()
        self.connection.close()
