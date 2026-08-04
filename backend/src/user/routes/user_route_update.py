from user.usecase.update_users import update_user
from user.service.service_update_user import user_sctructure_update
from user.models.model_update_user import user_model_update
from user.util.imageProfileNameSecure import imageSecureName

from flask import Blueprint, request, jsonify

user_route_update = Blueprint('user_route_update', __name__)

@user_route_update.route('/user_update', methods=['POST'])
def user_update():
    # 1. Pega apenas os dados de texto do formulário
    data = request.form.to_dict()
    print("chegou textos:", data)

    # 2. Verifica se a imagem veio na requisição
    if 'imageProfile' not in request.files:
        return jsonify({"error": "No imageProfile file provided"}), 400
    
    # 3. Extrai o arquivo da imagem do local correto (request.files)
    arquivo_imagem = request.files['imageProfile']
    
    # 4. Passa o arquivo para sua utilidade e adiciona o nome gerado ao dicionário 'data'
    data['imageProfile'] = imageSecureName(arquivo_imagem)
    
    # O restante do código continua igual!
    user_data = user_sctructure_update(data)

    user_sql, user_values = user_model_update(user_data)
    update_user(user_sql, user_values)

    return jsonify({
        "message": "Post updated successfully!",
        "post": {
            "name": user_data.get("name"),
            "lastname": user_data.get("lastname"),
            "telefone number": user_data.get("tel_number"),
            "email": user_data.get("email"),
            "passsword": user_data.get("password"),
            "imageProfile": user_data.get("imageProfile"),
            "id": user_data.get("id")
        }
    }), 201
