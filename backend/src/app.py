from flask import Flask, jsonify, request, Blueprint, make_response
from flask_cors import CORS

from user.routes.user_routes import user_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_routes)

if __name__ == "__main__":
    app.run(debug=True, port=5000)