from flask import jsonify

def user_exist_verification(user, emails_db, passwords_db):

    #user - email e senha
    #emails_db = a, b,  c
    #passwords_db = d,   e, f

    if user["email"] not in emails_db:
        return jsonify({
            "result" : "Email nao encontrado"
        }), 404
    if user["password"] not in passwords_db:
        return jsonify({
                    "result" : "Senha Incorreta"
                }), 404

    return jsonify({
                "result" : "Usuario cadastrado"
            }), 200