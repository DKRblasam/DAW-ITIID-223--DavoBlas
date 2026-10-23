/*  ------------------------------------------------------------
    Alert-into.js
    PHP termina cada operacion con una redireccion  ...?estado=CODIGO
    Este script lee el codigo, muestra el aviso correspondiente y limpia
    la URL (para que al recargar la pagina no vuelva a salir el aviso).
    Requiere ui.js cargado antes.
    ------------------------------------------------------------ */

(function () {
  const MENSAJES = {
    // Contacto (index.php)
    success: ["Mensaje guardado correctamente.", "exito"],
    error: ["No se pudo guardar el mensaje. Intenta de nuevo.", "error"],

    // Administracion (admin.php / editar.php)
    actualizado: ["El mensaje se actualizó correctamente.", "exito"],
    eliminado: ["El mensaje se eliminó correctamente.", "exito"],
    error_actualizar: ["No se pudo actualizar el mensaje.", "error"],
    error_eliminar: ["No se pudo eliminar el mensaje.", "error"],
    no_encontrado: ["El mensaje no existe o ya fue eliminado.", "error"],

    // Validaciones hechas por el servidor
    vacio: ["No se permiten campos vacíos.", "error"],
    invalido: ["El correo electrónico no es válido.", "error"],
    largo: ["El nombre o el correo exceden la longitud permitida.", "error"],
  };

  const params = new URLSearchParams(window.location.search);
  const estado = params.get("estado");

  if (estado === null) return;

  const aviso = MENSAJES[estado];
  if (aviso) {
    // Se espera a que la pagina termine de pintarse para que el aviso aparezca encima.
    window.addEventListener("load", () => window.mostrarModal(aviso[0], aviso[1]));
  }

  // Quitar solo ?estado=..., conservando el resto de parametros (p. ej. ?id=3) y el #ancla.
  params.delete("estado");
  const resto = params.toString();
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + window.location.hash
  );
})();
