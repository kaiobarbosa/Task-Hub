from user.usecase.select_users import select_user, select_user_by_email
from user.models.model_select_users import user_model_select_by_email
from user.util.user_exist import user_exist_verification
from flask import jsonify, request

def user_sctructure_login(data):

    user = {
        "email": data.get("email"),
        "password": data.get("password")
    }

    return user

def user_login_efetuated(sql, user_data):
    #Aqui chegou o email e senha junto do sql do select

    #Aqui foi armazenado todos os usuario do banco em uma variavel
    users_data_select = select_user(sql)

    email_users = [user[4] for user in users_data_select]
    password_users = [user[5] for user in users_data_select]
    #Aqui estamos pegando apenas os emails e as senhas dos usuarios

    result = user_exist_verification(user_data, email_users,  password_users)

    if result[1] == 200:
        sql_select_by_email = user_model_select_by_email()
        user_exist_data = select_user_by_email(sql_select_by_email, user_data["email"])

        return jsonify({
            
            "User" : user_exist_data
        }), 200
    else:

        return jsonify({
            "result_request":"User not found"
        }), 404