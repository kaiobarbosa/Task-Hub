from user.models.model_select_users import user_model_select
from user.service.service_login_user import user_sctructure_login, user_login_efetuated
from flask import Blueprint, request, jsonify, make_response

user_route_login = Blueprint('user_route_login', __name__)

@user_route_login.route('/user_login', methods=['POST'])
def users_select():

    #Aqui vai ser onde o backend vai coletar as informaçoes vindas do front
    # json {'email': 'admin@site.com', 'password': 'senha123'}
    data = request.get_json()

    #Aqui ele organiza no formato correto as informacoes vindas do front,  caso venha desorganizado
    user_data = user_sctructure_login(data)

    #Aqui ta sendo criado o sql do select de todos os usuarios
    user_sql = user_model_select()
    

    user_login = user_login_efetuated(user_sql, user_data)

    return user_login

