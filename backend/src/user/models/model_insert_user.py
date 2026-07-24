def user_model_insert(data):

    user_sql = "INSERT INTO users (name_user, lastname_user, tel_number, email, password) VALUES (%s, %s, %s, %s, %s);"

    user_values = (
            data.get("name"), 
            data.get("lastname"), 
            data.get("tel_number"), 
            data.get("email"), 
            data.get("password")
        )
    
    return user_sql, user_values