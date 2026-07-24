def user_model_update(data):

    user_sql = "UPDATE users SET name_user=%s, lastname_user=%s, tel_number=%s, email=%s, password=%s WHERE id=%s"

    user_values = (
            data.get("name"), 
            data.get("lastname"), 
            data.get("tel_number"), 
            data.get("email"), 
            data.get("password"),
            data.get("id")
        )
    
    return user_sql, user_values
