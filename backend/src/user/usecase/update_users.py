from config.connection_db import database_connector

def update_user(name, lastname, tel_number, email, password, id):
    connection = database_connector()
    cursor = connection.cursor()

    query = "UPDATE users SET name_user=%s, lastname_user=%s, tel_number=%s, email=%s, password=%s WHERE id=%s"
    cursor.execute(query, (name, lastname, tel_number, email, password, id))
    connection.commit()
    cursor.close()
    connection.close()
    if cursor.rowcount > 0:
        return True
    return False