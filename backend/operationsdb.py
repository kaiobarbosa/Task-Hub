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


