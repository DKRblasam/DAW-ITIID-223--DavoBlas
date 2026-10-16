<?php


function checkMsg()
{

  require_once '../DB/conexion.php';


  $sql_msg = "Select id, nombre_usuario, correo, mensaje, timeStaps from `mensajes`;";

  try {

    $rsMsg = mysqli_query($conn, $sql_msg);
    mysqli_close($conn);
    return $rsMsg;
  } catch (Exception $e) {

    die('Valio cola, al consultar: ' . $e->getMessage());
  }
}
