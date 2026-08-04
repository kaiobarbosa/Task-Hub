## Guia para a tela do usuario - home_screen

- localizaçao do arquivo html: frontend/src/pages/user_screen.html
- localizaçao do arquivo css: frontend/src/style/user/user_style.css
- localizaçao do arquivo js: frontend/src/service/pages_js/user_screen.js

- importar o css de reset primeiro
    - localizaçao: frontend/src/stye/reset.css

- importar a navbar
    - localizaçao: frontend/src/components/navbar.js

- regras gerais de css
    - tema escuro, dark, com detalhes em roxo
    botoes com uma pequena borda, algo como 3px, tambem roxa.
    as fontes deverao ser um lilas claro.
    Adicione tambem um hover nos botoes, tambem roxo porem com uma transparencia alta para que seja um hover delicado.

# hero Section

- Para a tela do usuario, deve-se ser criado uma estrutura onde o usuario possa visualizar suas informacoes seguindo de uma opcao de alteralas individualmente (nome - alterar nome).
    - informacoes do usuario:   - Nome
                                - Sobrenome
                                - Numero de telefone
                                - Email
                                - Senha
- Ademais aos campos, deve haver uma opcao, circular, para o usuario adicionar uma imagem de perfil que quando clicado encima, o usuario possa adicionar uma imagem .png ou .jpeg

- Destribuicao: 
    - A tela devera ser dividida em duas partes, esquerda e direita.

        - Esquerda: campos com os inputs e suas respctivas opcoes de alteracao
            - Cada input devera mostrar as informacoes atuais do usuario - neste primeiro momento faca isso de maneira estatica com as seguintes informacoes: 
                - nome: EDUARDO
                - Sobrenome: HENRIQUE
                - Numero de Telefone: (12) 99701-9156
                - Email: kaio.bragab@gmail.com
                - Senha: 123123
            - O campo de senha devera conter uma opcao de exibir ou nao a senha, o codigo para isso ja esta pronto e localizado em: frontend/src/utils/show_password.js
                - Analise o codigo em questao e importe a funcao ja criada no codigo para que a funcao seja utilizada.
        
        - Direita: 
            - Opcao circular para o usuario selecionar uma imagem
                - devera funcionar com um click encima, em seguida devera abrir o explorador de arquivos do usuario para que ele poça selecionar a imagem.
            - Botao de confirmar as alteracoes
                - o Botao devera estar disponivel para click somente se tiver tido alguma alteracao