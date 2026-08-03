from task.usecase.update_name_description_task import update_name_description_task
from task.services.service_update_name_description_task import task_sctructure_update_name_description
from task.models.model_update_name_description_task import task_model_update_name_description

from flask import Blueprint, request, jsonify, make_response

task_route_update_name_description = Blueprint('task_route_update_name_description', __name__)

@task_route_update_name_description.route('/task_update_name_description', methods=['PUT'])
def task_update_name_description():

    data = request.get_json()
    
    task_data = task_sctructure_update_name_description(data)
    task_sql, task_values = task_model_update_name_description(task_data)

    update_name_description_task(task_sql, task_values)

    return jsonify({
        "message": "Post update successfully!",
        "post": {
            "id_task": data.get("id_task"),
            "new_name": data.get("new_name"),
            "new_description": data.get("new_description")
            }
    }), 201
