document.getElementById('send-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    // 1. Captura os valores dos inputs
    const valorNome = document.getElementById('nome').value;
    const valorSobrenome = document.getElementById('sobrenome').value;
    const valorCep = document.getElementById('cep').value;
    const valorEmail = document.getElementById('email-cadastro').value;
    const valorSenha = document.getElementById('senha-cadastro').value;

    // 2. Cria um objeto com as propriedades que você precisa
    const dadosUsuario = {
        nome: valorNome,
        sobrenome: valorSobrenome,
        cep: valorCep,
        email: valorEmail,
        senha: valorSenha
    };

    // 3. Envia o JSON para o servidor Python (rodando localmente na porta 5001)
    fetch('http://127.0.0.1:5000/receber-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do Python:', data);
        alert('Dados enviados com sucesso para o Python!');
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
    });
});