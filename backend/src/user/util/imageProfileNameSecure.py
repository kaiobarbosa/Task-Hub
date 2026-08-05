import os
from werkzeug.utils import secure_filename
from flask import current_app # Importando o current_app

def imageSecureName(file):
    nome_arquivo = secure_filename(file.filename)
    
    # 1. Pega o caminho absoluto e exato de onde o seu Flask está rodando
    # Geralmente aponta direto para a sua pasta 'src' ou 'backend'
    base_path = current_app.root_path
    
    # 2. Monta o caminho exato para a pasta static/uploads baseada na raiz
    # Verifique se no seu projeto a pasta static fica dentro da mesma pasta do root
    caminho_pasta = os.path.join(base_path, 'static', 'uploads')
    
    # 3. Garante que a pasta existe
    os.makedirs(caminho_pasta, exist_ok=True)
    
    # 4. Junta o caminho final e salva a imagem
    caminho_completo = os.path.join(caminho_pasta, nome_arquivo)
    file.save(caminho_completo)
    
    # Imprime no terminal para você ver exatamente ONDE a imagem foi parar
    print("A IMAGEM FOI SALVA EXATAMENTE AQUI:", caminho_completo)
    
    return nome_arquivo
