from config.connection_db import database_connector

def update_user(sql, values):
    connection = database_connector()
    cursor = connection.cursor()

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False