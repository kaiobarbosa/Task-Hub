// 1. Envolvemos o código para garantir que o DOM carregou antes de rodar
document.addEventListener('DOMContentLoaded', () => {
    const dadosSalvos = localStorage.getItem('dadosUsuario');
    let nomeUsuario = "User"; // Nome padrão caso não tenha ninguém logado
    let imageProfile = '';

    // 2. Adicionamos um bloco try/catch e validações extras por segurança
    try {
        if (dadosSalvos) {
            const usuarioLogado = JSON.parse(dadosSalvos);
            
            // Verifica se o array realmente possui os dados esperados antes de acessar o índice
            if (usuarioLogado && usuarioLogado.length > 0 && usuarioLogado[0].length > 1) {
                nomeUsuario = usuarioLogado[0][1];
                imageProfile = usuarioLogado[0][6] || null; // Pega a imagem do perfil se existir
            }
        }
    } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
    }

    const avatarMarkup = imageProfile
        ? `<span class="profile-avatar" aria-hidden="true" style="background-image: url('${imageProfile}');"></span>`
        : `<span class="profile-avatar" aria-hidden="true"></span>`;

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
            
            <a class="profile-link" href="user_screen.html" aria-label="Perfil de ${nomeUsuario}">
              <span>${nomeUsuario}</span>
              ${avatarMarkup}
            </a>
          </nav>
        </header>
    `;

    // 4. Injeta na tela com segurança
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
    }
});