// ==========================================
// 1. DADOS SIMULADOS DO BANCO DE DADOS
// ==========================================
const emaildatabase = "admin@site.com";
const passworddatabase = "senha123";

// ==========================================
// 2. SELEÇÃO DOS ELEMENTOS DO HTML
// ==========================================
const form = document.querySelector('form');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const checkboxVerSenha = document.getElementById('ver-senha');

// ==========================================
// 3. LÓGICA DE MOSTRAR/ESCONDER SENHA
// ==========================================
checkboxVerSenha.addEventListener('change', function() {
  if (this.checked) {
    inputSenha.type = 'text';
  } else {
    inputSenha.type = 'password';
  }
});

// ==========================================
// 4. LÓGICA DE VALIDAÇÃO E REDIRECIONAMENTO
// ==========================================
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o recarregamento da página

  const emailDigitado = inputEmail.value;
  const senhaDigitada = inputSenha.value;

  if (emailDigitado === emaildatabase && senhaDigitada === passworddatabase) {
    
    // Se o login estiver correto, redireciona para a nova página:
    window.location.href = "homeScrean.html";
    
  } else {
    
    // Se estiver errado, mostra o erro e limpa a senha:
    alert("E-mail ou senha incorretos. Tente novamente.");
    inputSenha.value = ''; 
    inputSenha.focus(); 
  }
});