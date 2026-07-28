from task.usecase.update_status_task import update_status_task
from task.services.service_update_status_task import task_sctructure_update_status
from task.models.model_update_status_task import task_model_update_status

from flask import Blueprint, request, jsonify, make_response

task_route_update_status = Blueprint('task_route_update_status', __name__)

@task_route_update_status.route('/task_update_status', methods=['PUT'])
def task_update_status():

    data = request.get_json()
    # Process the inserted user data

    task_data = task_sctructure_update_status(data)
    task_sql, task_values = task_model_update_status(task_data)
    
    update_status_task(task_sql, task_values)

    return jsonify({
        "message": "Post update successfully!",
        "post": {
            "id_task": task_data.get("id_task"),
            "id_task": task_data.get("statusChange")
            }
    }), 201