# Fazer insert de novos usuarios.
# criar funcao para verificar se o usuario ja existe
# criar funcao para verificar se o email ja existe
# criar funcao para validar o formato do email
# criar funcao para validar a senha (ex: minimo 8 caracteres, pelo menos uma letra maiuscula, uma letra minuscula e um numero)
# criar funcao para criptografar a senha antes de salvar no banco
# criar funcao para autenticar o usuario (comparar a senha criptografada com a senha armazenada no banco)

import json
import mysql.connector
from mysql.connector import Error

def conectar_banco():
    try:
        # Estabelecendo a conexão
        conexao = mysql.connector.connect(
            host='localhost',          # Geralmente é localhost se estiver na sua máquina
            user='root',        # O padrão do MySQL costuma ser 'root'
            password='kaio2106',      # A senha que você definiu na instalação
            database='webdatabase'   # O nome do seu Schema/Banco de dados
        )

        if conexao.is_connected():
            db_info = conexao.get_server_info()
            print(f"Conectado ao servidor MySQL versão: {db_info}")
            
            # Criando um objeto cursor para executar consultas
            cursor = conexao.cursor()
            cursor.execute("SELECT DATABASE();")
            linha = cursor.fetchone()
            print(f"Você está conectado ao banco: {linha[0]}")
    
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        conexao = None

    return conexao