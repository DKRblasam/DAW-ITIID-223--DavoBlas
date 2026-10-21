(function () {
  const mensajes = {
    success: "Mensaje guardado correctamente.",
    error: "Error al guardar el mensaje. Inténtalo de nuevo.",

    updated: "El mensaje se actualizó correctamente.",
    update_error: "No se pudo actualizar el mensaje. Inténtalo de nuevo.",
    vacio: "No se puede enviar el formulario con campos vacíos.",
    correo_invalido: "El correo electrónico no es válido.",

    deleted: "El mensaje se eliminó correctamente.",
    delete_error: "No se pudo eliminar el mensaje.",

    no_encontrado: "El mensaje solicitado no existe.",
  };

  const params = new URLSearchParams(window.location.search);
  const estado = params.get("estado");

  if (estado === null) return;

  // Evita repetir el alert al recargar y conserva otros parámetros de la URL.
  params.delete("estado");
  const query = params.toString();
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + (query ? "?" + query : "")
  );

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (mensajes[estado]) alert(mensajes[estado]);
    }, 50);
  });
})();
