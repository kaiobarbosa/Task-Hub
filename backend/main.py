from flask import Flask, request, jsonify
from flask_cors import CORS
from dbconnection import conectar_banco # O seu arquivo de conexão
from operationsdb import *

app = Flask(__name__)
CORS(app) # Permite o Front-end conversar com o Back-end

def cadastrar_usuario():

    print("Iniciando processo de cadastro do usuário...")
    # 2. Abre a conexão com o banco de dados
    minha_conexao = conectar_banco()
    
    if not minha_conexao:
        return jsonify({"status": "erro", "mensagem": "Erro de conexão com o banco de dados"}), 500

    try:
        print("Conexão com o banco de dados estabelecida. Preparando para inserir usuário...")
        # 3. Cria o cursor
        meu_cursor = minha_conexao.cursor()

        # 4. Chama a função de inserção no banco passando os dados dinâmicos
        insertUsers(meu_cursor, minha_conexao)

        # 5. Responde ao JavaScript que deu tudo certo
        return jsonify({"status": "sucesso", "mensagem": "Usuário cadastrado com sucesso!"}), 201

    except Exception as e:
        # Responde ao JavaScript se algo quebrar no banco
        return jsonify({"status": "erro", "mensagem": str(e)}), 500

    finally:
        # 6. Fecha o cursor e a conexão independentemente de dar erro ou sucesso
        if 'meu_cursor' in locals() and meu_cursor:
            meu_cursor.close()
        if minha_conexao and minha_conexao.is_connected():
            minha_conexao.close()
            print("Conexão com o MySQL encerrada.\n")

if __name__ == '__main__':
    print("Servidor rodando na porta 5001! Aguardando cadastros do site...")
    app.run(port=5000, debug=True) # <-- Alterado para 5000