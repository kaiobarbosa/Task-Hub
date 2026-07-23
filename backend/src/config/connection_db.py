import mysql.connector
from mysql.connector import Error

def database_connector():
    try:
        # Estabelecendo a conexão
        conexao = mysql.connector.connect(
            host='localhost',          # Geralmente é localhost se estiver na sua máquina
            user='root',        # O padrão do MySQL caso nao tenha sido alterado
            password='kaio2106',      # A senha que você definiu na instalação
            database='th_database'   # O nome do seu Banco de dados
        )

    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        conexao = None

    return conexao