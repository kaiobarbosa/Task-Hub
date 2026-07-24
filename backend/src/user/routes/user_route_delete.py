from user.usecase.delete_users import delete_user
from user.service.service_delete_user import user_sctructure_delete
from user.models.model_delete_user import user_model_delete

from flask import Blueprint, request, jsonify, make_response

user_route_delete = Blueprint('user_route_delete', __name__)

@user_route_delete.route('/user_delete', methods=['DELETE'])
def user_delete():
    data = request.get_json()

    user_data = user_sctructure_delete(data)
    user_sql, user_values = user_model_delete(user_data)
    delete_user(user_sql, user_values)

    return jsonify({
        "message": "Post deleted successfully!",
        "post": {
            "id": data.get("id")
        }
    }), 201
