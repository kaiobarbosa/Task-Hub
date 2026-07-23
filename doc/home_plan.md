## Guia para a tela inicial - home_screen

- regras gerais de css
    - tema escuro, dark, com detalhes em roxo
    botoes com uma pequena borda, algo como 3px, tambem roxa.
    as fontes deverao ser um lilas claro.
    Adicione tambem um hover nos botoes, tambem roxo porem com uma transparencia alta para que seja um hover delicado.

# navbar

    -  a navbar sera utilizada futuramente em todas as paginas do site, por isso, a navbar nao deve ser criada direto no html da pagina home.
        Crie a navbar em java script, assim, ao criar uma nova pagina, sera necessario apenas importar o arquivo js e a navbar sera criada

    - a base ja esta criada na pagina index.html. Vamos usar ela como base.
        - o que sera mantido e o que sera mudado:
            A logo vai mantar, o modelo Th TASK-HUB ficou muito bom, recrie ele igual ao da index.
            -  a logo funcionara como um botao que redireciona o usuario para a tela inicial.
        - os botoes vai apenas mudar as opcoes:
            - primeiro da direita para a esquerda: perfil
                                                    pense em um circulo com a foto de perfil do usuario, nao crie a logica, apenas o circulo que posteriormente eu adiciono a logica. A esquerda do ciculo, ainda no primeiro botao,  o primeiro nome do usuario, por enquanto tambem nao adicione a logica, coloque 'user' de maneira estatca.

            - segundo da direta para. a esquerda: Task
                                                    utilize as regras de css da navbar de index, apenas mude a escrita para "TASK"

            - terceiro da direita para. a. esquerda: botao X
                                                    utilize as regras de css da navbar de index, apenas mude a escrita para "BOTAO X"
    
    - o arquivo java script que de fato criará a navbar devera ser criado em: frontend/src/components/navbar.js
    - o css da navbar devera ser criado em: frontend/src/assets/style/navbar.css
        - o arquivo ficara "global" em style para que seja acessado por outas paginas posteriormente.

# HERO SECTION

    - Crie tres divs,  uma grande na esquerda, duas empihadas na direita. 
    - Crie as divs usando quase toda o espaco da pagina sem que apareça uma scrollbar
    - Leve em consideracao que ja existe a navbar, as divs nao podem ficar a frente ou atras dela. 


        - Primeira Div.
            Resumo: A primeira da direita deve ser uma lista, sem possibilidade de acao, entao construa pensando que o usuario apenas vai ver as informacoes ali. Os dados que vao aparecer ali, eu vou importar do banco posteriormente, nao se preocupe com isso por agora, apenas saiba que sera um campo na esquerda com nome e um na direita escrito pendente ou concluido (pendente em amarelo e concluido em verde).

            Caso haja muitas informacoes adicionadas quando implementada a importacao do banco, a div tem que se manter estatica, adicionando uma scrollbar nela para que o usuario veja todas os dados. 

        - Segunda Div.
            Resumo: A segunda div sera um calendario, faca com que futuramente eu consiga editar a cor de fundo de um dia em especifico, isso nao precisa funcionar por completo agora, faca com que mude manualmente por enquanto.

            a cor do calendario deve seguir o palheta de cores do site. Ao marcar dias especificios, manualmente, apenas o background color do dia selecionado devera ficar verde.

            caso seja necessario, nessa div especifica criar um arquivo javascript para efetuar a marcacao dos dias e mudar o background color deles, crie um arquivo com nome "calendar_marcking.js" na pasta components - frontend/src/components

        - Terceira Div.
            Resumo: A terceira div sera o seguine, pense no grafico de commits do github, quero um naquele estilo, para que o usuario veja a frequencia com que ele realizou suas tasks.

            Descrevendo o grafico de commits do github. Ele possui uma linha de tempo visivel, faca inicialmente um periodo de tempo curto, apenas do mes em questao. devera ter marcacoes nessa linha de tempo quando uma task for concluida, nao faca a implementacao da logica de fato, apenas da parte estetica, apenas o frontend, uma div com uma area cm linha de tempo, etc.

