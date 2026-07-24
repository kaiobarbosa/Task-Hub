def user_model_select():

    user_sql = "SELECT * FROM users"
    
    return user_sql

def user_model_select_by_email():

    user_sql = "SELECT * FROM users WHERE email = %s"
    
    return user_sql 
