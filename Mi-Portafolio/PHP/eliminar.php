<?php

require_once __DIR__ . '/consultas.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['id'])) {
  header("Location: ./admin.php");
  exit;
}

$id = (int) $_POST['id'];

if ($id > 0 && deleteMsg($id)) {
  header("Location: ./admin.php?estado=deleted");
} else {
  header("Location: ./admin.php?estado=delete_error");
}
exit;
