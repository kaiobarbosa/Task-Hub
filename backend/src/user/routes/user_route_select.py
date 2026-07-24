from user.usecase.select_users import select_user
from flask import Blueprint, request, jsonify, make_response

user_route_select = Blueprint('user_route_select', __name__)

@user_route_select.route('/user_select', methods=['GET'])
def users_select():
    users_data = select_user()
    return jsonify(users_data)