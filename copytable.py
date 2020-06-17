import mysql.connector

connection =  mysql.connector.connect(
    host='localhost',
    user='root',
    password='dalehollow',
    database='mydatabase'
    )

cursor = connection.cursor()

cursor.execute("USE mydatabase")
cursor.execute("CREATE TABLE backup LIKE movies")
cursor.execute("INSERT INTO backup SELECT * FROM movies")
connection.commit()
