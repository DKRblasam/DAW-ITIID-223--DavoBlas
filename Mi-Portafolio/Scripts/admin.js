(function () {
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!form.classList || !form.classList.contains("form-eliminar")) return;

    const acepto = confirm("¿Estás seguro de borrar este mensaje?");

    if (!acepto) e.preventDefault();
  });

  const formEditar = document.getElementById("form-editar");

  if (formEditar) {
    formEditar.addEventListener("submit", (e) => {
      const nombre = formEditar.querySelector("#Name");
      const correo = formEditar.querySelector("#Email");
      const mensaje = formEditar.querySelector("#Msg");

      const rechazar = (texto, campo) => {
        e.preventDefault();
        alert(texto);
        campo.focus();
      };

      if (nombre.value.trim() === "") {
        return rechazar("Por favor, escribe el nombre.", nombre);
      }

      if (correo.value.trim() === "") {
        return rechazar("Por favor, escribe el correo electrónico.", correo);
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
        return rechazar("El correo electrónico no es válido.", correo);
      }

      if (mensaje.value.trim() === "") {
        return rechazar("Por favor, escribe el mensaje.", mensaje);
      }
    });
  }
})();
