from config.connection_db import database_connector

def select_task(sql, id_user):
    connection = database_connector()
    cursor = connection.cursor()

    cursor.execute(sql, (id_user,))
    result = cursor.fetchall()
    
    cursor.close()
    connection.close()

    return result