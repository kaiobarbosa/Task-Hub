const btnTasks = document.getElementById('tasks');
const btnAccount = document.getElementById('account');
const btnHome = document.getElementById('home');

function taskScreanSwitch(){

    window.location.href = "tasksScrean.html";

}

function accountScreanSwitch(){

    window.location.href = "accountScrean.html";

}

function homeScreanSwitch(){

    window.location.href = "homeScrean.html";

}

btnTasks.addEventListener('click', taskScreanSwitch);
btnAccount.addEventListener('click', accountScreanSwitch);
btnHome.addEventListener('click', homeScreanSwitch);

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