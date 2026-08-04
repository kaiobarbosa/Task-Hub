from flask import current_app
import os

def user_model_update(data):
    
    # data['imageProfile'] já é a string contendo o nome seguro gerado anteriormente
    nome_arquivo = data.get('imageProfile')
    
    # Monta a URL usando a string diretamente
    image_url = f"http://127.0.0.1:5500/backend/src/static/uploads/{nome_arquivo}"
        
    user_sql = "UPDATE users SET name_user=%s, lastname_user=%s, tel_number=%s, email=%s, password=%s, image_profile=%s WHERE id=%s"

    user_values = (
            data.get("name"), 
            data.get("lastname"), 
            data.get("tel_number"), 
            data.get("email"), 
            data.get("password"),
            image_url,
            data.get("id")
        )
    
    return user_sql, user_values
