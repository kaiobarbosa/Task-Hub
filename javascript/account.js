
const btnTasks = document.getElementById('tasks');
const btnHome = document.getElementById('home');
const btnConfig = document.getElementById('config');

function taskScreanSwitch(){

    window.location.href = "tasksScrean.html";

}

function homeScreanSwitch(){

    window.location.href = "homeScrean.html";

}

function configScreanSwitch(){

    window.location.href = "configurationScrean.html";

}

btnTasks.addEventListener('click', taskScreanSwitch);
btnHome.addEventListener('click', homeScreanSwitch);
btnConfig.addEventListener('click', configScreanSwitch);

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#sidebar-nav .menu-item");

  menuItems.forEach(item => {
    item.addEventListener("click", function(event) {
      if (this.getAttribute("href") !== "#") {
        return; 
      }

      event.preventDefault();

      menuItems.forEach(i => i.classList.remove("ativo"));
      this.classList.add("ativo");
    });
  });
});