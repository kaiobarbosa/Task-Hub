## login plano geral

- A tela de login deverá seguir as mesmas regras de css gerais do site:
    Regras: tema escuro, dark, com detalhes em roxo
            botoes com uma pequena borda, algo como 3px, tambem roxa.
            as fontes deverao ser um lilas claro.
            Adicione tambem um hover nos botoes, tambem roxo porem com uma transparencia alta para que seja um hover delicado.
            os items como divs, deveram ter um padding entre eles, algo entre 10-20px, deixo em aberto para voce definir.


# componentes e construcao

    - Uma div central, ocupando 90% da tela inteira, reserve os 10% para o padding com as bordas da pagina.
    - A div sera divida em duas partes,  esquerda e direita, sendo a esquerda login e a direita cadastro. Enquanto uma é exibida a outra fica escondida.
        Componentes da parte de login:
            - label escrito "Bem Vindo"
            - input para email, adicione um placeholder com a frase: "Digite o seu email..."
            - input para senha, adicione um placeholder com a frase: "Digite a sua senha..."
            - opcao para esconder ou exibir a senha baseada em um botao.
                - o javascript devera ser feito em um arquivo externo ao html, unico para esta funcao. Seu nome sera show_password.js e deve ser criado na pasta utils, em src: frontend/src/utils
            - opcao para criar uma conta caso nao tenha ainda. a escrita devera ser "Nao tem uma conta ainda? Crie aqui."
            - botao para logar com a seguinte escrita: Entrar
        
        Componentes da parte de criar conta:
            - input para nome, adicione um placeholder com a frase: "Digite o seu nome..."
            - input para sobrenome, adicione um placeholder com a frase: "Digite o seu sobrenome..."
            - input para N de telefone, adicione um placeholder com a frase: "Digite a seu numero de telefone..."
            - input para email, adicione um placeholder com a frase: "Digite o seu email..."
            - input para senha, adicione um placeholder com a frase: "Digite o sua senha..."
            - input para confirmar a senha, adicione um placeholder com a frase: "Digite novamente a senha..."
            - opcao para caso o usuario ja tenha uma conta. a escrita devera ser "Já tem uma conta? Entre aqui."
            - botao para enviar o formulario com a seguinte escrita "Criar conta"

    - Como ambas as opcoes estaram lado a lado na div, uma devera estar escondida e a outra nao. Quando o usuario entrar na pagina a opcao visivel devera ser a de login.
      Quando o usuario clicar na opcao para criar uma conta, devera ser exibida a parte de criar conta (direita da div) e a de login devera ficar escondida. Adicione um efeito gradiente para que essa mudanca ocorra.


O css devera ser feito em um unico arquivo chamado login.css
    O arquivo devera ser criado na pasta login, dentro de style, dentro de assets:
        frontend/src/assets/style/login.
Lembre-se tambem que o arquvio html esta em pages
    frontend/src/pages/login_screen.html        
             

