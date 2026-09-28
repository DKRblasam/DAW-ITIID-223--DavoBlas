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
  indice++;

  if (indice >= mesagges.length) {
    indice = 0;
  }

  document.getElementById("m-msg").textContent = mesagges[indice];
}

// Mostrar el primer mensaje al iniciar
document.getElementById("m-msg").textContent = mesagges[indice];

/*  ---------------------------
        Cambiar Estilos
    ---------------------------*/

const btnColor = document.getElementById("change1");
const btnFont = document.getElementById("change2");

const skills = document.querySelectorAll(".list-skills li");

// Arreglo con diferentes estilos
const estilos = [
  {
    backgroundColor: "#76615384",
    color: "color: #51453d",
    borderColor: "#766153",
  },
  {
    backgroundColor: "#51453d",
    color: "#ffffff",
    borderColor: "#766153",
  },
  {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    borderColor: "#3498db",
  },
  {
    backgroundColor: "#8e44ad",
    color: "#ffffff",
    borderColor: "#9b59b6",
  },
  {
    backgroundColor: "#16a085",
    color: "#ffffff",
    borderColor: "#1abc9c",
  },
  {
    backgroundColor: "#f39c12",
    color: "#ffffff",
    borderColor: "#e67e22",
  },
  {
    backgroundColor: "#c0392b",
    color: "#ffffff",
    borderColor: "#e74c3c",
  },
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

btnFont.addEventListener("click", () => {
  const fuenteAleatoria =
    tipografias[Math.floor(Math.random() * tipografias.length)];

  skills.forEach((skill) => {
    skill.style.fontFamily = fuenteAleatoria;
  });
});

// Cambiar color aleatoriamente
btnColor.addEventListener("click", () => {
  const estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];

  skills.forEach((skill) => {
    skill.style.backgroundColor = estiloAleatorio.backgroundColor;
    skill.style.color = estiloAleatorio.color;
    skill.style.borderColor = estiloAleatorio.borderColor;
  });
});

// ======================================
// Funcionalidad del formulario
// ======================================

const formulario = document.getElementById("form-contacto");

const nombre = document.getElementById("Name");
const correo = document.getElementById("Email");
const mensaje = document.getElementById("Msg");

const modal = document.getElementById("modal-respuesta");
const respuesta = document.getElementById("respuesta");
const cerrarModal = document.getElementById("cerrar-modal");

// ======================================
// Mostrar modal
// ======================================

function mostrarModal(texto, color) {
  respuesta.textContent = texto;
  respuesta.style.color = color;

  modal.classList.add("mostrar");

  cerrarModal.focus();
}

// ======================================
// Cerrar modal
// ======================================

function ocultarModal() {
  modal.classList.remove("mostrar");
}

// ======================================
// Validación del formulario
// ======================================

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // -------------------------
  // Validar nombre
  // -------------------------

  if (nombre.value.trim() === "") {
    mostrarModal("Por favor, escribe tu nombre.", "#a52a2a");

    nombre.focus();
    return;
  }

  // -------------------------
  // Validar correo
  // -------------------------

  if (correo.value.trim() === "") {
    mostrarModal("Por favor, escribe tu correo electrónico.", "#a52a2a");

    correo.focus();
    return;
  }

  // -------------------------
  // Validar mensaje
  // -------------------------

  if (mensaje.value.trim() === "") {
    mostrarModal("Por favor, escribe un mensaje antes de enviarlo.", "#a52a2a");

    mensaje.focus();
    return;
  }

  // -------------------------
  // Formulario correcto
  // -------------------------

  mostrarModal(
    "¡Datos enviados correctamente! Gracias por contactarme.",
    "#386641",
  );

  formulario.reset();
});

// ======================================
// Cerrar con botón
// ======================================

cerrarModal.addEventListener("click", () => {
  ocultarModal();
});

// ======================================
// Cerrar haciendo clic afuera
// ======================================

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    ocultarModal();
  }
});

// ======================================
// Cerrar con ESC
// ======================================

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    ocultarModal();
  }
});
