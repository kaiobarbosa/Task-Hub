def user_model_delete(data):

    user_sql = "delete from users where id=%s"

    user_values = (
            data.get("id"),
        )
    
    return user_sql, user_values
