
<?php

require __DIR__ . '/consultas.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id      = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

  $conn = conectar();

  $rs = $conn->prepare(
    "SELECT id, pagado
      FROM `gastos` where id = ?"
  );

  $rs->bind_param("i", $id);
  $rs->execute();
  $filas = $rs->get_result()->fetch_all(MYSQLI_ASSOC);

  $pagado = $filas[0]['pagado'] == 0 ? 1 : 1;

  $stmt = $conn->prepare(
    "UPDATE gastos
        SET pagado = ?
      WHERE id = ?"
  );
  $stmt->bind_param("ii", $pagado, $id);
  $ok = $stmt->execute();

  $stmt->close();
  $conn->close();
  header("Location: ../index.php?estado=" . ($ok ? "success" : "error") . "");
  exit;
}
