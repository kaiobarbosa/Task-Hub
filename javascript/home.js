const btnTasks = document.getElementById('tasks');
const btnAccount = document.getElementById('account');
const btnConfig = document.getElementById('config');

function taskScreanSwitch(){

    window.location.href = "tasksScrean.html";

}

function accountScreanSwitch(){

    window.location.href = "accountScrean.html";

}

function configScreanSwitch(){

    window.location.href = "configurationScrean.html";

}

btnTasks.addEventListener('click', taskScreanSwitch);
btnAccount.addEventListener('click', accountScreanSwitch);
btnConfig.addEventListener('click', configScreanSwitch);