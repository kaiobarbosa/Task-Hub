import json

def listar_usuarios(cursor):
    """Exemplo de SELECT usando o cursor"""
    comando = "SELECT id, nome FROM usuarios"
    cursor.execute(comando)
    resultados = cursor.fetchall()
    
    for linha in resultados:
        print(linha)

def insertUsers(cursor, conexao):
    try:
        with open('backend/json/dados.json', 'r', encoding='utf-8') as arquivo:
            lista_de_usuarios = json.load(arquivo) # Aqui vira uma LISTA
            print("Arquivo JSON lido com sucesso! Preparando para inserir no banco de dados...")
            print("Lendo dados do arquivo JSON e preparando para inserir no banco...")
        

        comand_sql = "INSERT INTO users (nome, sobrenome, cep, email, senha) VALUES (%s, %s, %s, %s, %s)"

        
        valores = (lista_de_usuarios["nome"], lista_de_usuarios["sobrenome"], lista_de_usuarios["cep"], lista_de_usuarios["email"], lista_de_usuarios["senha"])

        cursor.execute(comand_sql, valores)
        conexao.commit()
        print("Dados inseridos com sucesso!")
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")
    finally:
        if conexao and conexao.is_connected():
            conexao.close()
            print("Conexão com o MySQL foi encerrada.")

def searchTasksByTerm(cursor, conexao, termo):
    try:
        # Usamos % para o comando LIKE do SQL buscar palavras que contenham o termo em qualquer parte
        comando = "SELECT * FROM task WHERE task LIKE %s OR stats LIKE %s"
        termo_formatado = f"%{termo}%"
        
        # Passamos o termo duas vezes porque temos dois %s no comando SQL
        cursor.execute(comando, (termo_formatado, termo_formatado))
        resultados = cursor.fetchall()
        
        lista_formatada = []
        for linha in resultados:
            # Mantendo a mesma estrutura de chaves do seu selectAllTasks
            tarefa_dict = {"task": linha[1], "date_task": linha[2], "status": linha[3]}
            lista_formatada.append(tarefa_dict)
        
        print(f"Busca por '{termo}' finalizada. Encontradas {len(lista_formatada)} tarefas.")
        return lista_formatada
    except Exception as e:
        print(f"Erro ao buscar tarefas por termo: {e}")
        return []
    finally:
        if conexao and conexao.is_connected():
            conexao.close()
            print("Conexão com o MySQL foi encerrada.")

def selectAllTasks(cursor, conexao): 

    try:
        comando = "SELECT * FROM task"
        cursor.execute(comando)
        resultados = cursor.fetchall()
        
        lista_formatada = []
        for linha in resultados:
            tarefa_dict = {"task": linha[1], "date_task": linha[2], "status": linha[3]}
            lista_formatada.append(tarefa_dict)
        
        print("Tarefas buscadas e formatadas com sucesso!")
        return lista_formatada
    except Exception as e:
        print(f"Erro ao buscar tarefas: {e}")
    finally:
        if conexao and conexao.is_connected():
            conexao.close()
            print("Conexão com o MySQL foi encerrada.")