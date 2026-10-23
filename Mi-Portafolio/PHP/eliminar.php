<?php
/*  Borra un mensaje. Solo acepta POST (un enlace GET podria borrar datos
    con solo visitar una URL o por un prefetch del navegador).
    La confirmacion "¿Estas seguro...?" la pide admin.js ANTES de enviar. */

require_once __DIR__ . '/consultas.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header("Location: admin.php");
  exit;
}

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

if (!$id) {
  header("Location: admin.php?estado=no_encontrado");
  exit;
}

try {
  $estado = deleteMsg($id) ? 'eliminado' : 'no_encontrado';
} catch (Throwable $ex) {
  $estado = 'error_eliminar';
}

header("Location: admin.php?estado=$estado");
exit;
