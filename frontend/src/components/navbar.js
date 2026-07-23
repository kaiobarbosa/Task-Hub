const navbarHTML = `
    <header class="site-header navbar" aria-label="Cabeçalho do site">
      <a href="home_screen.html" class="brand" aria-label="Ir para a tela inicial do TASK-HUB">
        <span class="brand-mark">Th</span>
        <span>TASK-HUB</span>
      </a>

      <nav class="top-nav" aria-label="Navegação principal">
        <a href="#button-x">BOTAO X</a>
        <a href="task_screen.html">TASK</a>
        <a class="profile-link" href="#perfil" aria-label="Perfil de user">
          <span>user</span>
          <span class="profile-avatar" aria-hidden="true"></span>
        </a>
      </nav>
    </header>
`;

document.getElementById('navbar-container').innerHTML = navbarHTML;