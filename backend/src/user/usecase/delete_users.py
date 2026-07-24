from config.connection_db import database_connector

def delete_user(sql, value):
    connection = database_connector()
    cursor = connection.cursor()

    cursor.execute(sql, value)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False