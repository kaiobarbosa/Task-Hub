const btnHome = document.getElementById('home');
const btnAccount = document.getElementById('account');
const btnConfig = document.getElementById('config');

function homeScreanSwitch(){

    window.location.href = "homeScrean.html";

}

function accountScreanSwitch(){

    window.location.href = "accountScrean.html";

}

function configScreanSwitch(){

    window.location.href = "configurationScrean.html";

}

btnHome.addEventListener('click', homeScreanSwitch);
btnAccount.addEventListener('click', accountScreanSwitch);
btnConfig.addEventListener('click', configScreanSwitch);

// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#sidebar-nav .menu-item");

  menuItems.forEach(item => {
    item.addEventListener("click", function(event) {
      // Se o botão for um link para outra página (como o Início), 
      // deixa o navegador seguir o link normalmente.
      if (this.getAttribute("href") !== "#") {
        return; 
      }

      // Impede o comportamento padrão apenas se for um link '#'
      event.preventDefault();

      // Remove a classe 'ativo' de todos os botões
      menuItems.forEach(i => i.classList.remove("ativo"));

      // Adiciona a classe 'ativo' apenas no botão clicado
      this.classList.add("ativo");
    });
  });
});