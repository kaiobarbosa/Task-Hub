from user.models.model_select_users import user_model_select
from user.service.service_login_user import user_sctructure_login, user_login_efetuated
from flask import Blueprint, request, jsonify, make_response

user_route_login = Blueprint('user_route_login', __name__)

@user_route_login.route('/user_login', methods=['POST'])
def users_select():

    data = request.get_json()
    user_data = user_sctructure_login(data)
    user_sql = user_model_select()

    user_login = user_login_efetuated(user_sql, user_data)

    login_response = {
        user_login,
        "retornou"
    }

    return jsonify(user_login)
