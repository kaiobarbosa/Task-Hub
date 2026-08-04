def user_sctructure_update(data):

    user = {
        "name": data.get("name"),
        "lastname": data.get("lastname"),
        "tel_number": data.get("tel_number"),
        "email": data.get("email"),
        "password": data.get("password"),
        "imageProfile": data.get("imageProfile"),
        "id": data.get("id")
    }

    return user