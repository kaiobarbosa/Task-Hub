document.addEventListener("DOMContentLoaded", () => {
  const passwordButtons = document.querySelectorAll("[data-password-toggle]");

  passwordButtons.forEach((button) => {
    const passwordInput = document.getElementById(button.dataset.passwordTarget);

    if (!(passwordInput instanceof HTMLInputElement)) {
      return;
    }

    const updateButton = () => {
      const passwordIsVisible = passwordInput.type === "text";
      const action = passwordIsVisible ? "Ocultar" : "Mostrar";

      button.textContent = action;
      button.setAttribute("aria-pressed", String(passwordIsVisible));
      button.setAttribute("aria-label", `${action} senha`);
    };

    button.addEventListener("click", () => {
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      updateButton();
    });

    updateButton();
  });
});
