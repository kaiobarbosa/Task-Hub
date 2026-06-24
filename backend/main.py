from flask import Flask, request, jsonify
from flask_cors import CORS
from dbconnection import conectar_banco # O seu arquivo de conexão
from operationsdb import *

app = Flask(__name__)
CORS(app) # Permite o Front-end conversar com o Back-end


def atualizar_status_tarefa(task_id, novo_status):
    print(f"Iniciando atualização da tarefa {task_id} para o status '{novo_status}'...")
    
    minha_conexao = conectar_banco()
    if not minha_conexao:
        return {"status": "erro", "mensagem": "Erro de conexão com o banco de dados"}

    try:
        meu_cursor = minha_conexao.cursor()
        
        # Chama a função que criamos no operationsdb.py
        sucesso = updateTaskStatus(meu_cursor, minha_conexao, task_id, novo_status)
        
        if sucesso:
            return {"status": "sucesso", "mensagem": "Status atualizado com sucesso!"}
        else:
            return {"status": "erro", "mensagem": "Falha ao atualizar no banco de dados."}
            
    except Exception as e:
        print(f"Erro na intermediação da atualização: {e}")
        return {"status": "erro", "mensagem": str(e)}

def buscar_todas_as_tarefas():
    print("Iniciando processo de busca de tarefas no banco de dados...")
    # 1. Conecta no banco
    minha_conexao = conectar_banco()
    if not minha_conexao:
        return jsonify({"status": "erro", "mensagem": "Erro de conexão com o banco de dados"}), 500

    try:
        print("Conexão com o banco de dados estabelecida. Preparando para buscar tarefas...")
        meu_cursor = minha_conexao.cursor()
        lista_formatada = selectAllTasks(meu_cursor, minha_conexao) # <-- Chama a função que faz o SELECT * no banco
        # 3. Pega os resultados: resultados = cursor.fetchall()
        print(f"Resultados brutos do banco: {lista_formatada}")
        return lista_formatada
    except Exception as e:
        print(f"Erro ao buscar tarefas: {e}")
        return jsonify({"status": "erro", "mensagem": str(e)}), 500
    finally:
        if minha_conexao and minha_conexao.is_connected():
            minha_conexao.close()
            print("Conexão com o MySQL encerrada.\n")

def buscar_tarefas_por_termo(termo_de_busca):
    print(f"Iniciando busca de tarefas com o termo '{termo_de_busca}' no banco de dados...")
    
    minha_conexao = conectar_banco()
    if not minha_conexao:
        # Mantendo o padrão de retorno de erro que você usou em cadastrar_usuario
        return jsonify({"status": "erro", "mensagem": "Erro de conexão com o banco de dados"}), 500

    try:
        meu_cursor = minha_conexao.cursor()
        
        # Chama a nova função do operationsdb.py
        lista_formatada = searchTasksByTerm(meu_cursor, minha_conexao, termo_de_busca)
        
        return lista_formatada
    except Exception as e:
        print(f"Erro na intermediação da busca por termo: {e}")
        return {"status": "erro", "mensagem": str(e)}
    finally:
        # O operationsdb já fecha a conexão no seu código, mas o try/finally garante segurança
        pass 

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