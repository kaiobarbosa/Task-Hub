from user.usecase.select_users import select_user

def user_sctructure_login(data):

    user = {
        "email": data.get("email"),
        "password": data.get("password")
    }

    return user

def user_login_efetuated(sql, user_data):

    users_data_select = select_user(sql)

    email_users = [user[4] for user in users_data_select]
    password_users = [user[5] for user in users_data_select]

    if user_data["email"] in email_users:
        if user_data["password"] in password_users:
            validation = "exist"
        else:
            validation = "rong password"
    else:
        validation = "email not found"

    return validation