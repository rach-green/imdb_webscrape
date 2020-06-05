import mysql.connector
all_sql_tables = [...]

# An example of a single table creation called "articles" in SQL command
sql_articles = """CREATE TABLE IF NOT EXISTS articles (ID int AUTO_INCREMENT,
                                                     title TINYTEXT,
                                                     abstract TEXT,
                                                     publication_date TINYTEXT,
                                                     year int,
                                                     PRIMARY KEY(ID));"""
all_sql_tables.append(sql_articles) # list of all sql tables creation

def build_database(db_name, host_name, user_name, password, all_sql_tables):
  #  Define the connection and the cursor that is used for executing the SQL commands
  my_db = mysql.connector.connect(host=host_name, user=user_name, passwd=password, database=db_name)
  cursor = my_db.cursor()

  # Execute all SQL commands and commit it into the DB
  for sql_q in all_movies:
      cursor.execute(sql_q)
  my_db.commit()
  logger.info("\n*** Database was created successfully. ***\n")  # log into a logs file

  # If we get an error at some point, the my_db.rollback() reverts everything to the state we had in our last commit
  except mysql.connector.Error as error:
      my_db.rollback()  # rollback if any exception occured
      logger.critical("Failed creating database {}.".format(error)) # log into a logs file

  # Close database connection no matter what happened before
  finally:
      if my_db is not None and my_db.is_connected():
          cursor.close() ; my_db.close()
          logger.info("MySQL connection is closed.")
      else:
          logger.info("connection to MySQL did not succeed.")


try:
    # Instert all articles into the articles table.
    # Note that we use INSERT IGNORE which means that duplicates will not be inserted to DB (checked against doi_link).
    for key, item in all_articles.items():
        cursor.execute("""INSERT IGNORE INTO articles (title, abstract, publication_date, year
                        VALUES ('{}', '{}', '{}', '{}', {});""".format(key, item[0], item[1], item[2], int(item[3])))

    # The for loop above can be replaced with:
    # cur.executemany("""INSERT IGNORE INTO articles (doi_link, title, abstract, publication_date, citations)
    #                   VALUES ('{}', '{}', '{}', '{}', {});""".format(key, item[0], item[1], item[2], int(item[3])),
    #                   [--tuples of the data to be updated--])

# Catch any error that might occur and logging it into the logs file.
except (KeyError, IndexError, TypeError) as err:
    logger.error("There was an error during articles insertion. The error: {}".format(err))

    # Save the problematic articles to csv file for future inspection
    df = pd.DataFrame(list(all_articles.values()), index=list(all_articles.keys()))
    df.to_csv("Articles.csv", sep=',')

    # This is for debugging.
    # steps is a dict whose keys are the steps in the scraping processand its values are 1 or 0 (succeeded or failed)
    steps['Articles'] = 0
