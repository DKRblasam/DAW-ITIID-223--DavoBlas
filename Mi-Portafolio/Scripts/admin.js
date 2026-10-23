/*  ------------------------------------------------------------
    admin.js
    Logica de la zona de administracion (usa ui.js):
      1) Confirmar antes de borrar            (admin.php)
      2) Validar el formulario de edicion     (editar.php)
    El JS solo decide SI se envia el formulario; quien guarda, actualiza
    o borra es siempre PHP. Si el usuario cancela o hay errores, el
    formulario no se envia; si todo esta bien, se envia a PHP tal cual.
    ------------------------------------------------------------ */

(function () {
  // ---------- 1) Confirmar y borrar ----------
  // Delegacion de eventos: un solo listener para todas las filas.
  document.addEventListener("submit", async (e) => {
    const form = e.target;
    if (!form.classList || !form.classList.contains("form-eliminar")) return;

    // Se frena el envio, se pregunta, y solo si acepta se envia a eliminar.php.
    e.preventDefault();

    const acepto = await window.confirmarModal("¿Estás seguro de borrar este mensaje?");
    if (acepto) {
      form.submit(); // form.submit() no vuelve a disparar este evento
    }
  });

  // ---------- 2) Validacion del formulario de edicion ----------
  const formEditar = document.getElementById("form-editar");
  if (!formEditar) return;

  const nombre = formEditar.querySelector("#Name");
  const correo = formEditar.querySelector("#Email");
  const mensaje = formEditar.querySelector("#Msg");

  formEditar.addEventListener("submit", (e) => {
    const rechazar = (texto, campo) => {
      e.preventDefault();
      window.mostrarModal(texto, "error").then(() => campo.focus());
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

    // Todo correcto: no se hace preventDefault, el formulario viaja a editar.php,
    // PHP actualiza la BD y redirige a admin.php?estado=actualizado (Alert-into.js).
  });
})();
