const dadosSalvos = localStorage.getItem('dadosUsuario');
let nomeUsuario = "User"; // Nome padrão caso não tenha ninguém logado

if (dadosSalvos) {
    const usuarioLogado = JSON.parse(dadosSalvos);
    // 2. Extraímos o nome, que está no índice 1 da primeira lista
    nomeUsuario = usuarioLogado[0][1]; 
}

// 3. Montamos o HTML injetando a variável ${nomeUsuario}
const navbarHTML = `
    <header class="site-header navbar" aria-label="Cabeçalho do site">
      <a href="home_screen.html" class="brand" aria-label="Ir para a tela inicial do TASK-HUB">
        <span class="brand-mark">Th</span>
        <span>TASK-HUB</span>
      </a>

      <nav class="top-nav" aria-label="Navegação principal">
        <a href="#button-x">BOTAO X</a>
        <a href="task_screen.html">TASK</a>
        
        <a class="profile-link" href="#perfil" aria-label="Perfil de ${nomeUsuario}">
          <span>${nomeUsuario}</span>
          <span class="profile-avatar" aria-hidden="true"></span>
        </a>
      </nav>
    </header>
`;

// 4. Injeta na tela
document.getElementById('navbar-container').innerHTML = navbarHTML;