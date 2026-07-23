from config.connection_db import database_connector

def delete_user(id):
    connection = database_connector()
    cursor = connection.cursor()

    query = "delete from users where id=%s"
    cursor.execute(query, (id,))
    connection.commit()
    cursor.close()
    connection.close()
    if cursor.rowcount > 0:
        return True
    return False