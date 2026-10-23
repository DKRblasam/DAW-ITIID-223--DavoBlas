<?php
/*  ------------------------------------------------------------
    consultas.php
    Todas las operaciones sobre la tabla `mensajes` (CRUD).
    Las paginas PHP solo llaman a estas funciones, asi el SQL
    vive en un unico lugar.

    Todas usan sentencias preparadas (?), por lo que lo que escriba
    el usuario nunca se concatena al SQL (evita inyeccion SQL).
    ------------------------------------------------------------ */

/**
 * Abre una conexion nueva.
 * Se usa `require` (y no `require_once`) a proposito: cada llamada necesita
 * su propia variable $conn local. Con require_once la segunda funcion que se
 * ejecutara en una misma peticion no tendria $conn.
 */
function conectar(): mysqli
{
  require __DIR__ . '/../DB/conexion.php';
  return $conn;
}

/** READ (lista): todos los mensajes, del mas reciente al mas antiguo. */
function checkMsg(): array
{
  $conn = conectar();

  $rs = $conn->query(
    "SELECT id, nombre_usuario, correo, mensaje, timeStaps
       FROM mensajes
   ORDER BY timeStaps DESC, id DESC"
  );
  $filas = $rs->fetch_all(MYSQLI_ASSOC);

  $conn->close();
  return $filas;
}

/** READ (uno): devuelve un mensaje por id, o null si no existe. */
function getMsg(int $id): ?array
{
  $conn = conectar();

  $stmt = $conn->prepare(
    "SELECT id, nombre_usuario, correo, mensaje, timeStaps
       FROM mensajes WHERE id = ?"
  );
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $fila = $stmt->get_result()->fetch_assoc();

  $stmt->close();
  $conn->close();
  return $fila ?: null;
}

/**
 * UPDATE: actualiza nombre, correo y mensaje.
 * Devuelve true si la sentencia se ejecuto bien (aunque el usuario no haya
 * cambiado ningun dato; MySQL en ese caso reporta 0 filas afectadas).
 */
function updateMsg(int $id, string $nombre, string $correo, string $mensaje): bool
{
  $conn = conectar();

  $stmt = $conn->prepare(
    "UPDATE mensajes
        SET nombre_usuario = ?, correo = ?, mensaje = ?
      WHERE id = ?"
  );
  $stmt->bind_param("sssi", $nombre, $correo, $mensaje, $id);
  $ok = $stmt->execute();

  $stmt->close();
  $conn->close();
  return $ok;
}

/** DELETE: elimina un mensaje. Devuelve true solo si realmente borro una fila. */
function deleteMsg(int $id): bool
{
  $conn = conectar();

  $stmt = $conn->prepare("DELETE FROM mensajes WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $borrado = $stmt->affected_rows > 0;

  $stmt->close();
  $conn->close();
  return $borrado;
}

/**
 * Validacion del lado del servidor (la del navegador se puede saltar).
 * Devuelve '' si todo esta bien o el codigo de error que Alert-into.js
 * traduce a un mensaje: 'vacio' | 'invalido' | 'largo'.
 */
function validarMsg(string $nombre, string $correo, string $mensaje): string
{
  if ($nombre === '' || $correo === '' || $mensaje === '') {
    return 'vacio';
  }
  if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    return 'invalido';
  }
  if (longitud($nombre) > 100 || longitud($correo) > 150) {
    return 'largo';
  }
  return '';
}

/** Cuenta caracteres (no bytes); usa mbstring si esta activa, si no un respaldo. */
function longitud(string $texto): int
{
  return function_exists('mb_strlen') ? mb_strlen($texto, 'UTF-8') : (int) preg_match_all('/./us', $texto);
}

/** Escapa texto antes de imprimirlo en HTML (evita XSS). */
function e(?string $texto): string
{
  return htmlspecialchars($texto ?? '', ENT_QUOTES, 'UTF-8');
}
