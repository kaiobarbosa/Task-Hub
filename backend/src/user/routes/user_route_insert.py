from user.usecase.insert_users import insert_new_user
from user.service.service_insert_user import user_sctructure_insert
from user.models.model_insert_user import user_model_insert

from flask import Blueprint, request, jsonify, make_response

user_route_insert = Blueprint('user_route_insert', __name__)

@user_route_insert.route('/user_insert', methods=['POST'])
def user_insert():

    data = request.get_json()
    # Process the inserted user data

    user_data = user_sctructure_insert(data)
    user_sql, user_values = user_model_insert(user_data)
    insert_new_user(user_sql, user_values)

    return jsonify({
        "message": "Post created successfully!",
        "post": {
            "name": user_data.get("name"),
            "lastname": user_data.get("lastname"),
            "telefone number": user_data.get("tel_number"),
            "email": user_data.get("email"),
            "passsword": user_data.get("password"),
        }
    }), 201
