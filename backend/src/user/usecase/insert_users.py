from config.connection_db import database_connector

def insert_new_user(name, lastname, tel_number, email, password):
    connection = database_connector()
    cursor = connection.cursor()

    query = "INSERT INTO users (name_user, lastname_user, tel_number, email, password) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(query, (name, lastname, tel_number, email, password))
    connection.commit()
    cursor.close()
    connection.close()
    if cursor.rowcount > 0:
        return True
    return False