from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import main

app = Flask(__name__)

# Substitua o "CORS(app)" antigo por este abaixo:
CORS(app, resources={r"/*": {"origins": "*"}})

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

# Adicionamos o 'OPTIONS' aqui, que é a requisição invisível que o navegador faz para checar o CORS
@app.route('/listar-dados', methods=['GET', 'OPTIONS'])
def listar_dados():
    # Se for a requisição de checagem do navegador (OPTIONS), devolvemos apenas as permissões
    if request.method == 'OPTIONS':
        resposta_options = app.make_default_options_response()
        resposta_options.headers.add("Access-Control-Allow-Origin", "*")
        resposta_options.headers.add("Access-Control-Allow-Headers", "*")
        resposta_options.headers.add("Access-Control-Allow-Methods", "*")
        return resposta_options

    print("--- Recebido pedido de busca de dados do JavaScript ---")
    
    try:
        dados_do_banco = main.buscar_todas_as_tarefas() 
        
        # Criamos o objeto de resposta JSON
        resposta = jsonify(dados_do_banco)
        
        # FORÇA BRUTA: Injetamos as permissões de CORS direto na veia da resposta!
        resposta.headers.add("Access-Control-Allow-Origin", "*")
        
        return resposta, 200
        
    except Exception as e:
        print(f"Erro ao buscar dados: {e}")
        resposta_erro = jsonify({"erro": "Falha ao buscar dados no servidor"})
        resposta_erro.headers.add("Access-Control-Allow-Origin", "*")
        return resposta_erro, 500
    
@app.route('/api/search', methods=['GET', 'OPTIONS'])
def search_tasks():
    # Tratamento de CORS para a rota de pesquisa
    if request.method == 'OPTIONS':
        resposta_options = app.make_default_options_response()
        resposta_options.headers.add("Access-Control-Allow-Origin", "*")
        resposta_options.headers.add("Access-Control-Allow-Headers", "*")
        resposta_options.headers.add("Access-Control-Allow-Methods", "*")
        return resposta_options

    # 1. Pega o conteúdo enviado pelo JavaScript
    search_query = request.args.get('query', '')
    
    print(f"--- Recebido pedido de busca com o termo: '{search_query}' ---")
    
    try:
        # 2. Chama a função no main.py, repassando a responsabilidade para o banco de dados
        resultados_do_banco = main.buscar_tarefas_por_termo(search_query)
        
        # Se for uma resposta de erro vinda do main (tupla com status code), repassa diretamente
        if isinstance(resultados_do_banco, tuple):
            return resultados_do_banco
            
        # 3. Formata e retorna os dados via JSON para o frontend
        resposta = jsonify(resultados_do_banco)
        resposta.headers.add("Access-Control-Allow-Origin", "*")
        return resposta, 200
        
    except Exception as e:
        print(f"Erro ao processar a busca no servidor: {e}")
        resposta_erro = jsonify({"erro": "Falha ao processar pesquisa"})
        resposta_erro.headers.add("Access-Control-Allow-Origin", "*")
        return resposta_erro, 500

if __name__ == '__main__':
    # Roda o servidor na porta 5001
    app.run(port=5001, debug=True)

# python backend/readjson.py
# comanod para rodar o servidor Flask e receber os dados do JavaScript. Certifique-se de que o servidor esteja rodando antes de enviar os dados do frontend.˜