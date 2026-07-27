from task.usecase.insert_task import insert_new_task
from task.services.service_insert_task import task_sctructure_insert
from task.models.model_insert_task import task_model_insert

from flask import Blueprint, request, jsonify, make_response

task_route_insert = Blueprint('task_route_insert', __name__)

@task_route_insert.route('/task_insert', methods=['POST'])
def task_insert():

    data = request.get_json()
    # Process the inserted user data

    task_data = task_sctructure_insert(data)
    task_sql, task_values = task_model_insert(task_data)
    insert_new_task(task_sql, task_values)

    return jsonify({
        "message": "Post created successfully!",
        "post": {
            "id_user": task_data.get("id_user"),
            "name": task_data.get("name"),
            "description": task_data.get("description"),
        }
    }), 201
