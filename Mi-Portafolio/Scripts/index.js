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
// Validación del formulario de Contacto (index.php)
// Los avisos usan los modales de ui.js. Si los datos son válidos el
// formulario SE ENVÍA a guardar_msg.php; PHP guarda y redirige con
// ?estado=success, y Alert-into.js muestra la confirmación.
// ======================================

const formulario = document.getElementById("form-contacto");

if (formulario) {
  formulario.addEventListener("submit", (e) => {
    const nombre = document.getElementById("Name");
    const correo = document.getElementById("Email");
    const mensaje = document.getElementById("Msg");

    const rechazar = (texto, campo) => {
      e.preventDefault();
      mostrarModal(texto, "error").then(() => campo.focus());
    };

    if (nombre.value.trim() === "") {
      return rechazar("Por favor, escribe tu nombre.", nombre);
    }

    if (correo.value.trim() === "") {
      return rechazar("Por favor, escribe tu correo electrónico.", correo);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
      return rechazar("El correo electrónico no es válido.", correo);
    }

    if (mensaje.value.trim() === "") {
      return rechazar("Por favor, escribe un mensaje antes de enviarlo.", mensaje);
    }

    // Válido: no se hace preventDefault, el formulario viaja a PHP.
  });
}
