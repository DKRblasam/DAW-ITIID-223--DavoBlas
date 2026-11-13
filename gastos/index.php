<?php
require __DIR__ . '/PHP/consultas.php';
$mensajes = checkGastos();

$total_gastos = 0.0;
$total_pendientes = 0.0;

foreach ($mensajes as $m):
  if ((int)$m['pagado'] === 0) {
    $total_pendientes += (float) $m['monto'];
  } else {

    $total_gastos += $m['monto'];
  }
endforeach;

?>

<!doctype html>
<html lang="es">

<head>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gastos - Personales</title>
  <link rel="stylesheet" href="./CSS/Styles.css" />
</head>

<style>
  div {
    margin: 10px;
  }

  form {
    display: flex;
    gap: 5px;
  }

  th,
  td,
  tr {
    border: 2px black solid;
  }
</style>

<body>
  <main>
    <h1 class="title">Control de Gastos Personales</h1>
    <div class="gastos">
      <div class="g-total">
        <p class="indicador">
          Total de gastos: $ <?= $total_gastos ?>

        </p>
      </div>
      <div class="g-pendt">
        <p class="indicador">Gastos pendientes: $<?= $total_pendientes ?></p>
      </div>
    </div>
    <div class="reg-gasto">
      <h2 class="title">Registrar nuevo gasto</h2>
      <form action="./PHP/agregar.php" method="post">
        <div class="inp-cont">
          <label for="Concepto">Concepto:</label>
          <input type="text" name="concepto" id="concepto" />
        </div>
        <div class="inp-cont">
          <label for="Monto">Monto:</label>
          <input type="text" name="gasto" id="gasto" />
        </div>
        <div class="inp-cont">
          <label for="Categoria">Categoría:</label>
          <input type="Categoria" name="categoria" id="categoria">
        </div>
        <button>Registrar</button>
      </form>
    </div>
    <div class="table-gen">
      <?php if (count($mensajes) === 0): ?>
        <!-- Estado: Sin mensajes -->
        <div class="empty-message">
          <i class="fa-solid fa-inbox" style="font-size: 40px; margin-bottom: 15px; display: block; color: #4e7fd4;"></i>
          No se ha encontrado contenido. Aún no hay mensajes recibidos.
        </div>
      <?php else: ?>
        <p class="cantidad">
          <?php echo "Total de registros: " . count($mensajes); ?>
        </p>
        <!-- Estado: Con mensajes -->
        <table class="crud-table">
          <thead>
            <tr>

              <th>Concepto</th>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($mensajes as $m): ?>
              <tr>

                <td><?= e($m['concepto']) ?></td>
                <td><?= e($m['categoria']) ?></td>
                <td><?= e($m['monto']) ?></td>
                <td><?= e($m['fecha']) ?></td>
                <td><?= (int)$m['pagado'] === 0 ? "Pendiente" : "Pagado" ?></td>
                <td>
                  <div class="actions">
                    <!-- Eliminar: POST; admin.js pide confirmacion antes de enviarlo -->
                    <form class="form-eliminar" action="./PHP/editar.php" method="POST">
                      <input type="hidden" name="id" value="<?= (int)$m['id'] ?>">

                      <?= (int)$m['pagado'] === 0 ? '<button type="submit" class="btn-edit" title="Eliminar" aria-label="Eliminar mensaje">Marcar como Pagado</Button>' : "" ?>
                    </form>
                  </div>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>
  </main>
</body>

</html>