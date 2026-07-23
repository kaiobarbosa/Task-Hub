from user.usecase.select_users import select_user
from user.usecase.insert_users import insert_new_user
from user.usecase.update_users import update_user
from user.usecase.delete_users import delete_user

from flask import Blueprint, request, jsonify, make_response
import json
import os

user_routes = Blueprint('user_routes', __name__)


@user_routes.route('/user_select', methods=['GET'])
def users_select():
    users_data = select_user()
    return jsonify(users_data)

@user_routes.route('/user_insert', methods=['POST'])
def user_insert():

    data = request.get_json()
    # Process the inserted user data

    inserted = insert_new_user(
        name=data.get("name"),
        lastname=data.get("lastname"),
        tel_number=data.get("tel_number"),
        email=data.get("email"),
        password=data.get("password")
    )

    if not inserted:
        return jsonify({"error": "Failed to insert user"}), 400

    return jsonify({
        "message": "Post created successfully!",
        "post": {
            "name": data.get("name"),
            "lastname": data.get("lastname"),
            "telefone number": data.get("tel_number"),
            "email": data.get("email"),
            "passsword": data.get("password"),
        }
    }), 201

@user_routes.route('/user_update', methods=['PUT'])
def user_update():
    data = request.get_json()
    # Process the updated user data

    inserted = update_user(
        name=data.get("name"),
        lastname=data.get("lastname"),
        tel_number=data.get("tel_number"),
        email=data.get("email"),
        password=data.get("password"),
        id=data.get("id")
    )

    if not inserted:
        return jsonify({"error": "Failed to update user"}), 400

    return jsonify({
        "message": "Post updated successfully!",
        "post": {
            "name": data.get("name"),
            "lastname": data.get("lastname"),
            "telefone number": data.get("tel_number"),
            "email": data.get("email"),
            "passsword": data.get("password"),
            "id": data.get("id")
        }
    }), 201

@user_routes.route('/user_delete', methods=['DELETE'])
def user_delete():
    data = request.get_json()
    # Process the deleted user data

    deleted = delete_user(
        id=data.get("id")
    )

    if not deleted:
        return jsonify({"error": "Failed to delete user"}), 400

    return jsonify({
        "message": "Post deleted successfully!",
        "post": {
            "id": data.get("id")
        }
    }), 201