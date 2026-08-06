document.addEventListener('DOMContentLoaded', () => {
  const dadosSalvos = localStorage.getItem('dadosUsuario');
  let imageProfile = null;
  if (!dadosSalvos) {
    console.error('Nenhum usuário logado encontrado.');
    return;
  }

  const usuarioLogado = JSON.parse(dadosSalvos);
  const dadosUsuario = Array.isArray(usuarioLogado) && usuarioLogado.length > 0 ? usuarioLogado[0] : [];

  const form = document.getElementById('user-form');
  const confirmButton = document.getElementById('confirm-updates');
  const avatarInput = document.getElementById('avatar-input');
  const avatarPicker = document.querySelector('.avatar-picker');

  if (!form || !confirmButton || !avatarInput || !avatarPicker) {
    return;
  }

  const nomeInput = form.querySelector('input[type="text"]');
  const sobrenomeInput = form.querySelectorAll('input[type="text"]')[1];
  const telefoneInput = form.querySelectorAll('input[type="text"]')[2];
  const emailInput = form.querySelector('input[type="email"]');
  const senhaInput = document.getElementById('user-password');

  if (dadosUsuario.length >= 6) {
    if (nomeInput) nomeInput.value = dadosUsuario[1] || '';
    if (sobrenomeInput) sobrenomeInput.value = dadosUsuario[2] || '';
    if (telefoneInput) telefoneInput.value = dadosUsuario[3] || '';
    if (emailInput) emailInput.value = dadosUsuario[4] || '';
    if (senhaInput) senhaInput.value = dadosUsuario[5] || '';
  }

  const fotoPerfil = dadosUsuario[6] || '';
  if (fotoPerfil) {
    avatarPicker.style.backgroundImage = `url('${fotoPerfil}')`;
    avatarPicker.style.backgroundSize = 'cover';
    avatarPicker.style.backgroundPosition = 'center';
    avatarPicker.style.color = 'transparent';

    const previewLabel = avatarPicker.querySelector('p');
    const previewIcon = avatarPicker.querySelector('.avatar-placeholder');

    if (previewLabel) previewLabel.textContent = '';
    if (previewIcon) previewIcon.textContent = '';
  }

  const initialValues = Array.from(form.querySelectorAll('input')).map((input) => input.value);
  let hasChanges = false;

  const updateConfirmState = () => {
    confirmButton.disabled = !hasChanges;
  };

  form.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => {
      hasChanges = Array.from(form.querySelectorAll('input')).some((field, index) => field.value !== initialValues[index]);
      updateConfirmState();
    });
  });

  avatarInput.addEventListener('change', (event) => {
    imageProfile = event.target.files || [];

    if (imageProfile.length > 0) {
      const file = imageProfile[0];
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

      hasChanges = true;
      updateConfirmState();
    }
  });

    confirmButton.addEventListener('click', async (event) => {
    // ESSA LINHA É A MAIS IMPORTANTE: impede que o HTML recarregue a página por padrão
    event.preventDefault(); 
    
    if (!hasChanges) {
      return;
    }

    // Mudamos o texto para você ver visualmente que o código avançou e não deu reload
    confirmButton.textContent = 'Salvando...';

    // Aguarda a atualização dos dados no backend e no localStorage
    await updateUserData(nomeInput.value, sobrenomeInput.value, telefoneInput.value, emailInput.value, senhaInput.value, imageProfile);

    confirmButton.textContent = 'Alterações confirmadas';
    confirmButton.disabled = true;
    hasChanges = false;
  });
});

async function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

async function updateUserData(nome, sobrenome, telefone, email, senha, imageProfile) {
    const dadosSalvos = localStorage.getItem('dadosUsuario');
    const dadosUsuario = JSON.parse(dadosSalvos);
    const idUsuario = dadosUsuario[0][0];

    const userData = new FormData();
    userData.append('id', idUsuario);
    userData.append('name', nome);
    userData.append('lastname', sobrenome);
    userData.append('tel_number', telefone);
    userData.append('email', email);
    userData.append('password', senha);

    if (imageProfile && imageProfile.length > 0) {
        userData.append('imageProfile', imageProfile[0]);
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/user_update', {
            method: 'POST',
            body: userData,
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Dados do usuário atualizados no banco com sucesso:', result);

            let imagemParaSalvar = '';

            if (imageProfile && imageProfile.length > 0) {
                imagemParaSalvar = await readFileAsDataUrl(imageProfile[0]);
            } else {
                imagemParaSalvar = dadosUsuario[0][6] || '';
            }

            const dadosDoUsuario = result?.User || [[idUsuario, nome, sobrenome, telefone, email, senha, imagemParaSalvar]];
            localStorage.setItem('dadosUsuario', JSON.stringify(dadosDoUsuario));

            alert('Dados do usuário atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar dados do usuário:', result);
            alert('Erro ao atualizar dados do usuário. Verifique o console para mais detalhes.');
        }

    } catch (error) {
        console.error('Erro de conexão com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o Flask está rodando.');
    }
}