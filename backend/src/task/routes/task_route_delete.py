from task.usecase.delete_task import delete_task_by_id
from task.services.service_delete_task import task_sctructure_delete
from task.models.model_delete_task import task_model_delete

from flask import Blueprint, request, jsonify, make_response

task_route_delete = Blueprint('task_route_delete', __name__)

@task_route_delete.route('/task_delete', methods=['DELETE'])
def task_delete():

    data = request.get_json()

    task_data = task_sctructure_delete(data)
    print(task_data)
    task_sql, task_values = task_model_delete(task_data)
    delete_task_by_id(task_sql, task_values)

    return jsonify({
        "message": "Task delete successfully!",
        "post": {
            "teste" : data
        }
    }), 201
