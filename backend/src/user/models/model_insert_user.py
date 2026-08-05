def user_model_insert(data):

    user_sql = "INSERT INTO users (name_user, lastname_user, tel_number, email, password, image_profile) VALUES (%s, %s, %s, %s, %s, %s);"

    nome_arquivo = data.get('imageProfile')
        
    # Monta a URL usando a string diretamente
    image_url = f"http://127.0.0.1:5500/backend/src/static/uploads/{nome_arquivo}"
            

    user_values = (
            data.get("name"), 
            data.get("lastname"), 
            data.get("tel_number"), 
            data.get("email"), 
            data.get("password"),
            image_url
        )
    
    return user_sql, user_values