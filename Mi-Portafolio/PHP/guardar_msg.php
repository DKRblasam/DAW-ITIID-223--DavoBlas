<?php

require_once('../DB/conexion.php');

if (isset($_POST['Name']) && isset($_POST['Email']) && isset($_POST['Msg'])) {

  $Name = $_POST['Name'];
  $Email = $_POST['Email'];
  $Msg = $_POST['Msg'];

  $sql = "INSERT INTO mensajes (nombre_usuario, correo, mensaje) VALUES (?, ?, ?)";

  $stmt = $conn->prepare($sql);

  $stmt->bind_param("sss", $Name, $Email, $Msg);

  if ($stmt->execute()) {
    mysqli_close($conn);
    echo "Mensaje guardado correctamente.";
    header("Location: ../index.php?estado=success");
    exit;
  } else {
    mysqli_close($conn);
    echo "Error al guardar el mensaje: " . $stmt->error;
    header("Location: ../index.php?estado=error");
    exit;
  }
}
