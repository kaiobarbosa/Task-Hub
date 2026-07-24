from user.usecase.update_users import update_user
from user.service.service_update_user import user_sctructure_update
from user.models.model_update_user import user_model_update

from flask import Blueprint, request, jsonify

user_route_update = Blueprint('user_route_update', __name__)

@user_route_update.route('/user_update', methods=['PUT'])
def user_update():
    data = request.get_json()
    # Process the updated user data

    user_data = user_sctructure_update(data)
    user_sql, user_values = user_model_update(user_data)
    update_user(user_sql, user_values)

    return jsonify({
        "message": "Post updated successfully!",
        "post": {
            "name": user_data.get("name"),
            "lastname": user_data.get("lastname"),
            "telefone number": user_data.get("tel_number"),
            "email": user_data.get("email"),
            "passsword": user_data.get("password"),
            "id": user_data.get("id")
        }
    }), 201
