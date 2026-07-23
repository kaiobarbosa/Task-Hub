from config.connection_db import database_connector

def select_user():
    connection = database_connector()
    cursor = connection.cursor()

    query = "SELECT * FROM users"
    cursor.execute(query)
    result = cursor.fetchall()
    
    cursor.close()
    connection.close()

    return result