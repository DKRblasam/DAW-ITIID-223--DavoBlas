const params = new URLSearchParams(window.location.search);
const estado_ins = params.get("estado");

if (estado_ins === "success") {
  alert("Mensaje guardado correctamente.");
}

if (estado_ins === "error") {
  alert("Error al guardar el mensaje; te va explotar la computadora");
}

if (estado != null) {
  window.history.replaceState ({}, document.title, window.location.pathname)
}