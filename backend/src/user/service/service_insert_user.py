def user_sctructure_insert(data):

    user = {
        "name": data.get("name"),
        "lastname": data.get("lastname"),
        "tel_number": data.get("tel_number"),
        "email": data.get("email"),
        "password": data.get("password")
    }
    
    return user