const formCadastro = document.getElementById('register-form');
const avatarInput = document.getElementById('register-avatar-input');
const avatarPicker = document.querySelector('.avatar-picker-register');
let selectedImageFile = null;

if (avatarInput && avatarPicker) {
    avatarInput.addEventListener('change', (event) => {
        const [file] = event.target.files || [];

        if (!file) {
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        const previewLabel = avatarPicker.querySelector('p');
        const previewIcon = avatarPicker.querySelector('.avatar-placeholder');

        avatarPicker.style.backgroundImage = `url('${previewUrl}')`;
        avatarPicker.style.backgroundSize = 'cover';
        avatarPicker.style.backgroundPosition = 'center';
        avatarPicker.style.color = 'transparent';

        if (previewLabel) {
            previewLabel.textContent = '';
        }

        if (previewIcon) {
            previewIcon.textContent = '';
        }

        selectedImageFile = file;
    });
}

formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name_user = document.getElementById('name_user').value;
    const lastname_user = document.getElementById('lastname_user').value;
    const tel_number_user = document.getElementById('tel_number_user').value;
    const email_user = document.getElementById('email_user').value;
    const password_user = document.getElementById('password_user').value;

    const userData = new FormData();
    userData.append('name', name_user);
    userData.append('lastname', lastname_user);
    userData.append('tel_number', tel_number_user);
    userData.append('email', email_user);
    userData.append('password', password_user);

    if (selectedImageFile) {
        userData.append('imageProfile', selectedImageFile);
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/user_insert', {
            method: 'POST',
            body: userData
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Cadastro realizado com sucesso!');
            window.location.href = 'login_screen.html';
        } else {
            alert('Ops! Erro ao cadastrar: ' + (result.erro || 'Verifique os dados'));
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
});