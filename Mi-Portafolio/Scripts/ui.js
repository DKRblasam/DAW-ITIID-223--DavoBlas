/*  ------------------------------------------------------------
    ui.js  (se carga PRIMERO en todas las paginas)
    Alerts y modales reutilizables, hechos solo con JS:

      mostrarModal(texto, tipo)      -> aviso con boton "Cerrar"
      confirmarModal(texto)          -> Promise<boolean> (Aceptar / Cancelar)

    - Si la pagina ya trae el modal #modal-respuesta (index.php, editar.php)
      se reutiliza; si no (admin.php) se crea desde JS. Por eso ningun
      archivo PHP necesita llevar el HTML del modal.
    - Si algo falla al crear el modal, se usa alert()/confirm() nativos
      como respaldo, para que la accion nunca se quede bloqueada.
    ------------------------------------------------------------ */

(function () {
  const COLORES = { exito: "#386641", error: "#a52a2a", info: "#231710" };
  const TITULOS = {
    exito: "Listo",
    error: "Atención",
    info: "Mensaje",
    confirmar: "Confirmar",
  };

  let modal, titulo, texto, acciones;
  let alCerrar = null; // funcion que se ejecuta al cerrar (resuelve la promesa)

  function construir() {
    modal = document.getElementById("modal-respuesta");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modal-respuesta";
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "titulo-modal");
      modal.innerHTML =
        '<div class="modal-contenido">' +
        '<h3 id="titulo-modal">Mensaje</h3>' +
        '<p id="respuesta"></p>' +
        '<button type="button" id="cerrar-modal">Cerrar</button>' +
        "</div>";
      document.body.appendChild(modal);
    }

  titulo = modal.querySelector("h3");
  texto = modal.querySelector("#respuesta");

  // Contenedor de botones dinamico: se rellena segun sea aviso o confirmacion.
  const contenido = modal.querySelector(".modal-contenido");
  const botonOriginal = modal.querySelector("#cerrar-modal");
  if (botonOriginal) botonOriginal.remove();
  acciones = document.createElement("div");
  acciones.className = "modal-botones";
  contenido.appendChild(acciones);

  // Cerrar con clic en el fondo oscuro o con Escape (= cancelar).
  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrar(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("mostrar"))
      cerrar(false);
  });
}

  function boton(etiqueta, valor, clase) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = etiqueta;
    if (clase) b.className = clase;
    b.addEventListener("click", () => cerrar(valor));
    return b;
  }

  function abrir(tipo, mensaje, botones) {
    titulo.textContent = TITULOS[tipo] || TITULOS.info;
    texto.textContent = mensaje;
    texto.style.color = COLORES[tipo] || COLORES.info;
    acciones.replaceChildren(...botones);
    modal.classList.add("mostrar");
    botones[botones.length - 1].focus();
  }

  function cerrar(valor) {
    modal.classList.remove("mostrar");
    if (alCerrar) {
      const f = alCerrar;
      alCerrar = null;
      f(valor);
    }
  }

  /** Aviso. tipo: "exito" | "error" | "info". Devuelve una Promise (se resuelve al cerrar). */
  window.mostrarModal = function (mensaje, tipo) {
    tipo = ["exito", "error", "info"].includes(tipo) ? tipo : "info";
    if (!modal) {
      alert(mensaje);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      alCerrar = resolve;
      abrir(tipo, mensaje, [boton("Cerrar", true)]);
    });
  };

  /** Confirmacion. Devuelve una Promise<boolean>: true = Aceptar, false = Cancelar/Escape. */
  window.confirmarModal = function (mensaje) {
    if (!modal) return Promise.resolve(confirm(mensaje));
    return new Promise((resolve) => {
      alCerrar = resolve;
      abrir("confirmar", mensaje, [
        boton("Cancelar", false, "btn-secundario"),
        boton("Aceptar", true),
      ]);
    });
  };

  // Compatibilidad con el nombre anterior (color en vez de tipo).
  window.ocultarModal = function () {
    if (modal) cerrar(false);
  };

  function iniciar() {
    try {
      construir();
    } catch (err) {
      modal = null;
    }
    // Quita la validacion nativa del navegador: la hacemos nosotros con modales.
    // El servidor (PHP) vuelve a validar, asi que sigue siendo seguro.
    document.querySelectorAll("form").forEach((f) => (f.noValidate = true));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
