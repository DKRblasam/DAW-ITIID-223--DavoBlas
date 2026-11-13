<?php
require __DIR__ . '/consultas.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header("Location: ../index.php");
  exit;
}

$concepto  = trim($_POST['concepto']  ?? '');
$Monto  = trim($_POST['gasto'] ?? '');
$Categoria = trim($_POST['categoria']   ?? '');
$Pagado = 0;


$conn = conectar();
$stmt = $conn->prepare(
  "INSERT INTO gastos (concepto, monto, categoria, pagado) VALUES (?, ?, ?,?)"
);
$stmt->bind_param("ssss", $concepto, $Monto, $Categoria, $Pagado);
$ok = $stmt->execute();
$stmt->close();
$conn->close();

header("Location: ../index.php?estado=" . ($ok ? "success" : "error") . "#Contacto");
exit;