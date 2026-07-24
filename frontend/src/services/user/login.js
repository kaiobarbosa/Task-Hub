const formLogin = document.getElementById('login-form');
const btnLogin = document.querySelector('.login-submit');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email_user = document.getElementById('email_user').value;
    const password_user = document.getElementById('password_user').value;

    const userData = {
        email: email_user,
        password: password_user
    };

    console.log("Dados armazenados", userData);

    try {
        // CORREÇÃO: "fetch" ao invés de "fatch"
        const response = await fetch('http://127.0.0.1:5000/user_login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Login realizado com sucesso!");
            window.location.href = "home_screen.html";
        } else {
            alert("Ops! Erro ao efetuar o login: " + (result.erro || "Verifique os dados")); 
        }

    } catch (error) {
        console.error("Erro de conexão com o servidor:", error);
        alert("Não foi possível conectar ao servidor. Verifique se o Flask está rodando.");
    } finally {
        
    }
});