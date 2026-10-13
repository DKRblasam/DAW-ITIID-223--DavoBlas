/*  ---------------------------
        Cambiar Mensaje Header
    ---------------------------*/

const mesagges = [
  "Estudiante de Tecnologías de la Información · Universidad Politécnica",
  "Qué tal, soy David.",
  "Bienvenido a mi portafolio.",
  "Aquí puedes ver lo que estoy construyendo.",
  "Código, proyectos y aprendizaje.",
  "Siempre hay algo nuevo que aprender.",
  "Este es mi espacio para experimentar.",
  "Vamos viendo qué sale.",
  "Construyendo proyectos, aprendiendo en el proceso.",
];

let indice = 0;

function changeMesagge() {
  const msgElement = document.getElementById("m-msg");
  if (!msgElement) return;

  indice++;
  if (indice >= mesagges.length) {
    indice = 0;
  }
  msgElement.textContent = mesagges[indice];
}

const msgElement = document.getElementById("m-msg");
if (msgElement) {
  msgElement.textContent = mesagges[indice];
}

/*  ---------------------------
        Cambiar Estilos
    ---------------------------*/

const btnColor = document.getElementById("change1");
const btnFont = document.getElementById("change2");
const skills = document.querySelectorAll(".list-skills li");

const estilos = [
  { backgroundColor: "#76615384", color: "#51453d", borderColor: "#766153" },
  { backgroundColor: "#51453d", color: "#ffffff", borderColor: "#766153" },
  { backgroundColor: "#2c3e50", color: "#ecf0f1", borderColor: "#3498db" },
  { backgroundColor: "#8e44ad", color: "#ffffff", borderColor: "#9b59b6" },
  { backgroundColor: "#16a085", color: "#ffffff", borderColor: "#1abc9c" },
  { backgroundColor: "#f39c12", color: "#ffffff", borderColor: "#e67e22" },
  { backgroundColor: "#c0392b", color: "#ffffff", borderColor: "#e74c3c" },
];

const tipografias = [
  "'Monoton', 'Segoe UI'",
  "Arial, sans-serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Verdana, sans-serif",
  "Trebuchet MS, sans-serif",
  "Times New Roman, serif",
  "'Bungee Shade', cursive",
  "'Creepster', cursive",
  "'Fascinate', cursive",
  "'Major Mono Display', monospace",
  "'Nosifer', cursive",
  "'Rye', cursive",
  "'UnifrakturCook', cursive",
];

if (btnFont) {
  btnFont.addEventListener("click", () => {
    const fuenteAleatoria =
      tipografias[Math.floor(Math.random() * tipografias.length)];
    skills.forEach((skill) => {
      skill.style.fontFamily = fuenteAleatoria;
    });
  });
}

if (btnColor) {
  btnColor.addEventListener("click", () => {
    const estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
    skills.forEach((skill) => {
      skill.style.backgroundColor = estiloAleatorio.backgroundColor;
      skill.style.color = estiloAleatorio.color;
      skill.style.borderColor = estiloAleatorio.borderColor;
    });
  });
}

// ======================================
// Modal y utilidades
// ======================================

const modal = document.getElementById("modal-respuesta");
const respuesta = document.getElementById("respuesta");
const cerrarModal = document.getElementById("cerrar-modal");

function mostrarModal(texto, color) {
  if (!modal || !respuesta) return;
  respuesta.textContent = texto;
  respuesta.style.color = color;
  modal.classList.add("mostrar");
  if (cerrarModal) cerrarModal.focus();
}

function ocultarModal() {
  if (modal) modal.classList.remove("mostrar");
}

if (cerrarModal) {
  cerrarModal.addEventListener("click", ocultarModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) ocultarModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") ocultarModal();
});

// ======================================
// Validación del formulario de Contacto (index.html)
// ======================================

const formulario = document.getElementById("form-contacto");

if (formulario) {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("Name");
    const correo = document.getElementById("Email");
    const mensaje = document.getElementById("Msg");

    if (nombre && nombre.value.trim() === "") {
      mostrarModal("Por favor, escribe tu nombre.", "#a52a2a");
      nombre.focus();
      return;
    }

    if (correo && correo.value.trim() === "") {
      mostrarModal("Por favor, escribe tu correo electrónico.", "#a52a2a");
      correo.focus();
      return;
    }

    if (mensaje && mensaje.value.trim() === "") {
      mostrarModal("Por favor, escribe un mensaje antes de enviarlo.", "#a52a2a");
      mensaje.focus();
      return;
    }

    mostrarModal(
      "¡Datos enviados correctamente! Gracias por contactarme.",
      "#386641"
    );
    formulario.reset();
  });
}

// ======================================
// Validación del formulario de Edición (editar.php)
// ======================================

const formulario1 = document.getElementById("form-editar");

if (formulario1) {
  formulario1.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = formulario1.querySelector("#Name");
    const correo = formulario1.querySelector("#Email");
    const mensaje = formulario1.querySelector("#Msg");

    if (nombre && nombre.value.trim() === "") {
      mostrarModal("Por favor, escribe el nombre a editar.", "#a52a2a");
      nombre.focus();
      return;
    }

    if (correo && correo.value.trim() === "") {
      mostrarModal("Por favor, escribe el correo electrónico.", "#a52a2a");
      correo.focus();
      return;
    }

    if (mensaje && mensaje.value.trim() === "") {
      mostrarModal("Por favor, escribe el mensaje.", "#a52a2a");
      mensaje.focus();
      return;
    }

    mostrarModal(
      "¡Mensaje actualizado correctamente!",
      "#386641"
    );
  });
}