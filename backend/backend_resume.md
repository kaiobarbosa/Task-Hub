## Backend 

# Mapping

Estrutura e logica escrita para controle pessoal.

Model View Controller

[Frontend (JS)] 
    │ 
    ▼
[app] (Opa, chegou uma requisição na URL /cadastro)
    │ 
    ▼
[routes] (vai encaminhar pro local correto)
    │ 
    ▼
[controlers] (Vou criptografar essa senha e aplicar a lógica de cadastro)
    │ 
    ▼
[service] (Vou usar o molde do Usuário para salvar isso no banco)
    │ 
    ▼
[models] (vai montar a estrutura que vai ser impressa no comando sql)
    │ 
    ▼
[usecase] (vai executar, propriamente dito, o comando sql)