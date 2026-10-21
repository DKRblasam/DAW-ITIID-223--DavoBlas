<?php

function checkMsg()
{
  require __DIR__ . '/../DB/conexion.php';

  $sql_msg = "Select id, nombre_usuario, correo, mensaje, timeStaps from `mensajes` order by id desc;";

  try {

    $rsMsg = mysqli_query($conn, $sql_msg);
    mysqli_close($conn);
    return $rsMsg;
  } catch (Exception $e) {

    die('Valio cola, al consultar: ' . $e->getMessage());
  }
}

function editMsg($id)
{
  require __DIR__ . '/../DB/conexion.php';

  $sql_msg = "Select id, nombre_usuario, correo, mensaje, timeStaps from `mensajes` where id = ?;";

  try {

    $stmt = $conn->prepare($sql_msg);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $rsMsg = $stmt->get_result();
    $row = $rsMsg->fetch_assoc();
    $stmt->close();
    mysqli_close($conn);
    return $row ?: null;
  } catch (Exception $e) {

    die('Valio cola, al consultar: ' . $e->getMessage());
  }
}

function updateMsg($id, $nombre, $correo, $mensaje)
{
  require __DIR__ . '/../DB/conexion.php';

  $sql_upd = "Update `mensajes` set nombre_usuario = ?, correo = ?, mensaje = ? where id = ?;";

  try {

    $stmt = $conn->prepare($sql_upd);
    $stmt->bind_param("sssi", $nombre, $correo, $mensaje, $id);
    $ok = $stmt->execute();
    $stmt->close();
    mysqli_close($conn);
    return $ok;
  } catch (Exception $e) {

    return false;
  }
}

// Devuelve false si no se eliminó ninguna fila.
function deleteMsg($id)
{
  require __DIR__ . '/../DB/conexion.php';

  $sql_del = "Delete from `mensajes` where id = ?;";

  try {

    $stmt = $conn->prepare($sql_del);
    $stmt->bind_param("i", $id);
    $ok = $stmt->execute() && $stmt->affected_rows > 0;
    $stmt->close();
    mysqli_close($conn);
    return $ok;
  } catch (Exception $e) {

    return false;
  }
}
