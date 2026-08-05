from user.usecase.insert_users import insert_new_user
from user.service.service_insert_user import user_sctructure_insert
from user.models.model_insert_user import user_model_insert
from user.util.imageProfileNameSecure import imageSecureName

from flask import Blueprint, request, jsonify

user_route_insert = Blueprint('user_route_insert', __name__)

@user_route_insert.route('/user_insert', methods=['POST'])
def user_insert():
    data = request.form.to_dict()

    if 'imageProfile' not in request.files:
            return jsonify({"error": "No imageProfile file provided"}), 400
    
    arquivo_imagem = request.files['imageProfile']
        
    # 4. Passa o arquivo para sua utilidade e adiciona o nome gerado ao dicionário 'data'
    data['imageProfile'] = imageSecureName(arquivo_imagem)
        
    user_data = user_sctructure_insert(data)
    user_sql, user_values = user_model_insert(user_data)
    insert_new_user(user_sql, user_values)

    return jsonify({
        "message": "Post created successfully!",
        "post": {
            "name": user_data.get("name"),
            "lastname": user_data.get("lastname"),
            "telefone number": user_data.get("tel_number"),
            "email": user_data.get("email"),
            "passsword": user_data.get("password"),
            "imageProfile": user_data.get("imageProfile")
        }
    }), 201
