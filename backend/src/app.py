from flask import Flask, jsonify, request, Blueprint, make_response
from flask_cors import CORS
import os

from user.routes.user_route_insert import user_route_insert
from user.routes.user_route_update import user_route_update
from user.routes.user_route_delete import user_route_delete
from user.routes.user_route_login import user_route_login

from task.routes.task_route_select import task_route_select
from task.routes.task_route_insert import task_route_insert
from task.routes.task_route_update_status import task_route_update_status
from task.routes.task_route_delete import task_route_delete
from task.routes.task_route_update_name_description import task_route_update_name_description

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_blueprint(user_route_insert)
app.register_blueprint(user_route_update)
app.register_blueprint(user_route_delete)
app.register_blueprint(user_route_login)

app.register_blueprint(task_route_select)
app.register_blueprint(task_route_insert)
app.register_blueprint(task_route_update_name_description)
app.register_blueprint(task_route_update_status)
app.register_blueprint(task_route_delete)

if __name__ == "__main__":
    app.run(debug=True, port=5000)