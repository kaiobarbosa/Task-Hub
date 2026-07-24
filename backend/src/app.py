from flask import Flask, jsonify, request, Blueprint, make_response
from flask_cors import CORS

from user.routes.user_route_insert import user_route_insert
from user.routes.user_route_update import user_route_update
from user.routes.user_route_delete import user_route_delete
from user.routes.user_route_select import user_route_select

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_route_insert)
app.register_blueprint(user_route_update)
app.register_blueprint(user_route_delete)
app.register_blueprint(user_route_select)

if __name__ == "__main__":
    app.run(debug=True, port=5000)