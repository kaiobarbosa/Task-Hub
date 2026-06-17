from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import main

app = Flask(__name__)
CORS(app) # Permite que o JavaScript do navegador acesse este servidor

@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    # Recebe o JSON enviado pelo JavaScript
    dados_json = request.get_json()
    
    # Aqui você já tem o JSON como um dicionário Python!
    print("--- JSON Recebido com Sucesso ---")
    print(dados_json)
    
    # Salva os dados em um arquivo JSON
    with open('backend/json/dados.json', 'w', encoding='utf-8') as arquivo:
        json.dump(dados_json, arquivo, ensure_ascii=False, indent=4)
    
    print("Arquivo JSON criado dentro da pasta backend!")
    
    # Faça aqui o que precisar (salvar no banco de dados, criar arquivo, etc.)
    main.cadastrar_usuario() # <-- Chama a função de cadastro do main.py para inserir no banco de dados  
    # Retorna uma resposta de sucesso para o JavaScript
    return jsonify({"status": "sucesso", "mensagem": "Dados processados no Python!"}), 200

if __name__ == '__main__':
    # Roda o servidor na porta 5000
    app.run(port=5000, debug=True)