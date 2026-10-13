<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <link rel="stylesheet" href="../css/global-style.css" />
  <link rel="stylesheet" href="../css/style-adm.css" />

  <title>Admin --- Mensajes</title>
</head>

<body>
  <header>
    <h1>Zona de administración</h1>
    <p class="msg">Editar mensaje</p>
  </header>

  <nav>
    <a href="./admin.php" aria-label="Volver a administración">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3">
        <path
          d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" />
      </svg>
    </a>
    <a href="../index.html" aria-label="Volver al inicio">
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 -960 960 960" 
        width="30" 
        fill="currentColor">
        <path d="M480-427ZM240-120q-50 0-85-35t-35-85v-240q0-24 9-46t26-39l240-240q17-18 39.5-26.5T480-840q23 0 45 8.5t40 26.5l240 240q17 17 26 39t9 46v240q0 50-35 85t-85 35H240Zm0-80h480q17 0 28.5-11.5T760-240v-240q0-8-3-15t-9-13L595-662l-59 58 144 144v180H280v-180l258-258-30-30q-8-8-15.5-10t-12.5-2q-5 0-12.5 2T452-748L212-508q-6 6-9 13t-3 15v240q0 17 11.5 28.5T240-200Zm120-160h240v-67L480-547 360-427v67Z" />
      </svg>
    </a>
  </nav>

  <main>
    <section id="Editar-msg" class="project">
      <h2>Editar mensaje</h2>
      <form id="form-editar" action="" method="POST">
        <div class="el">
          <label for="Name">Nombre</label>
          <input type="text" id="Name" name="Name" placeholder="David ..." />
        </div>
        <div class="el">
          <label for="Email">Correo</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="juanito@correo.com" />
        </div>

        <div class="el">
          <label for="Msg">Mensaje</label>
          <textarea
            id="Msg"
            name="Msg"
            rows="5"
            placeholder="Escribe tu mensaje aquí..."></textarea>
        </div>

        <button type="submit">Actualizar mensaje</button>
      </form>

      <!-- Modal de respuesta -->
      <div
        id="modal-respuesta"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal">
        <div class="modal-contenido">
          <h3 id="titulo-modal">Mensaje</h3>
          <p id="respuesta"></p>

          <button type="button" id="cerrar-modal">Cerrar</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-column">
          <div class="brand-header">
            <div class="brand-box">DB</div>
            <div class="brand-title">
              <h3>David Blas</h3>
              <p>Universidad Politécnica</p>
            </div>
          </div>
          <p class="brand-description">
            Portafolio hecho como práctica de HTML y CSS para la materia de
            Desarrollo Web.
          </p>
        </div>
        <div class="footer-column">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="../index.html#Home">Inicio</a></li>
            <li><a href="../index.html#Me">Sobre mí</a></li>
            <li><a href="../index.html#Skills">Habilidades</a></li>
            <li><a href="../index.html#Proyectos">Proyectos</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="mailto:125054204@upq.edu.mx">125054204@upq.edu.mx</a>
            </li>
            <li>Querétaro, México</li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Sígueme</h4>
          <div class="social-links">
            <a href="#" class="social-link facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link twitter" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 David Blas. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <script src="../Scripts/index.js"></script>
</body>

</html>