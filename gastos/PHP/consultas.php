<?php
function conectar(): mysqli
{
  require __DIR__ . '/conexion.php';
  return $conn;
}
function checkGastos(): array
{
  $conn = conectar();

  $rs = $conn->query(
    "SELECT id, concepto, categoria, monto, fecha, pagado
      FROM `gastos`
      order by `pagado` ASC"
  );

  $filas = $rs->fetch_all(MYSQLI_ASSOC);
  return $filas;
}


/** Escapa texto antes de imprimirlo en HTML (evita XSS). */
function e(?string $texto): string
{
  return htmlspecialchars($texto ?? '', ENT_QUOTES, 'UTF-8');
}
