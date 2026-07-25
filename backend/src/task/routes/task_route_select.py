from task.models.model_select_task import task_model_select
from task.usecase.select_tasks import select_task

from flask import Blueprint, request, jsonify, make_response

task_route_select = Blueprint('task_route_select', __name__)

@task_route_select.route('/user_tasks/<int:id_user>', methods=['GET'])
def task_select(id_user):

    task_sql = task_model_select()

    tasks_user = select_task(task_sql, id_user)

    return jsonify({
        "message": "Tasks encontradas",
        "tasks": tasks_user
    }), 200