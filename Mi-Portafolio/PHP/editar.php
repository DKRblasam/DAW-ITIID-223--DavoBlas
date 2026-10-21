<?php

require_once __DIR__ . '/consultas.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $id      = isset($_POST['id']) ? (int) $_POST['id'] : 0;
  $nombre  = isset($_POST['Name']) ? trim($_POST['Name']) : '';
  $correo  = isset($_POST['Email']) ? trim($_POST['Email']) : '';
  $mensaje = isset($_POST['Msg']) ? trim($_POST['Msg']) : '';

  if ($id <= 0) {
    header("Location: ./admin.php?estado=no_encontrado");
    exit;
  }

  // Mantiene la validación aunque JavaScript esté desactivado.
  if ($nombre === '' || $correo === '' || $mensaje === '') {
    header("Location: ./editar.php?id=" . $id . "&estado=vacio");
    exit;
  }

  if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    header("Location: ./editar.php?id=" . $id . "&estado=correo_invalido");
    exit;
  }

  if (updateMsg($id, $nombre, $correo, $mensaje)) {
    header("Location: ./admin.php?estado=updated");
  } else {
    header("Location: ./editar.php?id=" . $id . "&estado=update_error");
  }
  exit;
}

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$registro = $id > 0 ? editMsg($id) : null;

if ($registro === null) {
  header("Location: ./admin.php?estado=no_encontrado");
  exit;
}

function e($valor)
{
  return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
}

?>
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
    <p class="msg">Formulario para editar</p>
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
    <a href="../index.php" aria-label="Volver al inicio">
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
      <form id="form-editar" action="./editar.php?id=<?= (int) $registro['id'] ?>" method="POST" novalidate>
        <input type="hidden" name="id" value="<?= (int) $registro['id'] ?>" />
        <div class="el">
          <label for="Name">Nombre</label>
          <input type="text" id="Name" name="Name" placeholder="David ..." value="<?= e($registro['nombre_usuario']) ?>" />
        </div>
        <div class="el">
          <label for="Email">Correo</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="juanito@correo.com"
            value="<?= e($registro['correo']) ?>" />
        </div>

        <div class="el">
          <label for="Msg">Mensaje</label>
          <textarea
            id="Msg"
            name="Msg"
            rows="5"
            placeholder="Escribe tu mensaje aquí..."><?= e($registro['mensaje']) ?></textarea>
        </div>
        <button type="submit">Actualizar mensaje</button>
      </form>
    </section>
  </main>
  <div class="footer-bottom">
    <p>© 2026 David Blas. Todos los derechos reservados.</p>
  </div>

  <script src="../Scripts/admin.js"></script>
  <script src="../Scripts/Alert-into.js"></script>
</body>

</html>