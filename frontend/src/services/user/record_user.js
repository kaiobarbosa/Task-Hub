const formCadastro = document.getElementById('register-form');
const btnSubmit = document.querySelector('.register-submit');

formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const name_user = document.getElementById('name_user').value;
    const lastname_user = document.getElementById('lastname_user').value;
    const tel_number_user = document.getElementById('tel_number_user').value;
    const email_user = document.getElementById('email_user').value;
    const password_user = document.getElementById('password_user').value;

    const userData = {
        name: name_user,
        lastname: lastname_user,
        tel_number: tel_number_user,
        email: email_user,
        password: password_user
    };

    console.log("Dados armazenados", userData);

    try {
        // CORREÇÃO: "fetch" ao invés de "fatch"
        const response = await fetch('http://127.0.0.1:5000/user_insert', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Cadastro realizado com sucesso!");
            window.location.href = "login_screen.html";
        } else {
            alert("Ops! Erro ao cadastrar: " + (result.erro || "Verifique os dados")); 
        }

    } catch (error) {
        console.error("Erro de conexão com o servidor:", error);
        alert("Não foi possível conectar ao servidor. Verifique se o Flask está rodando.");
    } finally {
        
    }
});