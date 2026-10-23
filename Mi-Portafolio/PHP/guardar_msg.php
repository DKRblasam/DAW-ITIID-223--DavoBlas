<?php
/*  Recibe el formulario de contacto del portafolio (index.php).
    No imprime nada antes de header(): un echo previo provoca el error
    "headers already sent" y la redireccion no ocurre. */

require_once __DIR__ . '/consultas.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header("Location: ../index.php");
  exit;
}

$nombre  = trim($_POST['Name']  ?? '');
$correo  = trim($_POST['Email'] ?? '');
$mensaje = trim($_POST['Msg']   ?? '');

// Aunque el JS ya valida, el servidor nunca debe confiar en el navegador.
$error = validarMsg($nombre, $correo, $mensaje);
if ($error !== '') {
  header("Location: ../index.php?estado=$error#Contacto");
  exit;
}

$conn = conectar();
$stmt = $conn->prepare(
  "INSERT INTO mensajes (nombre_usuario, correo, mensaje) VALUES (?, ?, ?)"
);
$stmt->bind_param("sss", $nombre, $correo, $mensaje);
$ok = $stmt->execute();
$stmt->close();
$conn->close();

header("Location: ../index.php?estado=" . ($ok ? "success" : "error") . "#Contacto");
exit;
