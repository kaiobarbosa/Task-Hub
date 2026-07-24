from config.connection_db import database_connector

def select_user(sql):
    connection = database_connector()
    cursor = connection.cursor()

    cursor.execute(sql)
    result = cursor.fetchall()
    
    cursor.close()
    connection.close()

    return result