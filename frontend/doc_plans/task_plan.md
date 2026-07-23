## Guia para a tela de tasks - task_screen

- regras gerais de css
    - tema escuro, dark, com detalhes em roxo
    botoes com uma pequena borda, algo como 3px, tambem roxa.
    as fontes deverao ser um lilas claro.
    Adicione tambem um hover nos botoes, tambem roxo porem com uma transparencia alta para que seja um hover delicado.

# Hero Section

    - Nesta tela, diferente da Home_screen,  haver duas divs uma encima e uma embaixo.

        - Div superior
            - menor em relacao a outra, ambas possuiram o mesmo width entretando o height da primeira devera ser menor.
            - ao cerregar a pagina a mesma devera estar vazia.

        - Div Inferior
            - maior em relacao a outra, pensadno que elas ocuparam a tela toda, tendo apenas um padding pequeno em todas as direcoes de maneira a distancialas um pouco, POUCO, da borda. A div de baixo ocupara dois tercos do height da tela enquanto a superior ocupara um terco do tamanho. Este tamanho é levendo em consideracao a navbar, e o padding mensionado anteriormente
            - nesta div estara listada todas as tasks do usuario
            - a div sera feita como uma lista, onde cada elemento podera ser clicado. na direita de cada item devera ter uma check box para marcar se a task em questao foi ou nao concluida
                -checkbox marcada, status como concluido
                -checkbox desmarcada,  status como pendente
                -devera seguir aquele padrao de cor mensionado em home_screen, onde verde é concluido e amarelo é pendente
                -como padrao ela vira como desmarcada
            - a esquerda do status, ainda no canto direito de cada elemento, devera ter um botao com um lapis para que possa ser feito a edicao. Por hora o botao nao tera uma acao.

            
# Hero section second sprint

    - Div superior

    - nela, devera haver a opcao de criar uma nova task que quando clicado ela abre um formulario, dentro da div superior, com os seguintes campos:
        - input para nome da task, adicione um placeholder com a frase: "Digite o nome da task..."
        - input para descricao da task, adicione um placeholder com a frase: "Digite a descriçao da task..."

        - O segundo input devera ter o height maior que o primeiro para que o usuario possa escrever um texto grande. Caso o usuario chegue no final do input e ele continue digitando, a escrita devera continuar na linha de baixo e qunado a escrita atingir o height maximo devera aparecer uma scrollbar para que o usuario possar ver tudo o que ele escreveu

        - uma dropbox com niveis de 1 - 4 sendo um o mais baixo e 4 o mais alto.

        - um botao para cancelar
        - um botao para criar a task

    - quando carrregada a pagina o usuario devera ver apenas o botao de criar uma task, o formulario devera ficar escondido
    - o botao de cancelar deve esconder o formulario novamente e deixar apenas o botao de criar uma task, o botao padrao da div superior
    - quando o usuario clicar no botao de criar a task, o formulario tambem voltara a ficar escondido, exibindo apenas o botao original da div superior.

    - Vou deixar a organizacao dos componentes por sua conta, quero algo bem organizado, agradavel de se ver e que seja sofisticado. Me surpreenda