<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Fuentes e iconos de FontAwesome para las acciones -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="../css/global-style.css" />
    <link rel="stylesheet" href="../css/style-adm.css" />

    <title>Admin --- Portafolio</title>

</head>

<body>
    <header>
        <h1>Zona de administración</h1>
        <p class="msg">Mensajes recibidos</p>
    </header>
    <nav>
        <a href="../index.php" aria-label="Volver al inicio">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="30" fill="currentColor">
                <path d="M480-427ZM240-120q-50 0-85-35t-35-85v-240q0-24 9-46t26-39l240-240q17-18 39.5-26.5T480-840q23 0 45 8.5t40 26.5l240 240q17 17 26 39t9 46v240q0 50-35 85t-85 35H240Zm0-80h480q17 0 28.5-11.5T760-240v-240q0-8-3-15t-9-13L595-662l-59 58 144 144v180H280v-180l258-258-30-30q-8-8-15.5-10t-12.5-2q-5 0-12.5 2T452-748L212-508q-6 6-9 13t-3 15v240q0 17 11.5 28.5T240-200Zm120-160h240v-67L480-547 360-427v67Z" />
            </svg>
        </a>
    </nav>
    <main>
        <!-- Ajuste del contenedor principal para darle amplitud -->
        <div class="project" style="max-width: 900px; margin: 40px auto; display: block; border: none; background: transparent;">
            <div class="msg-rvd">
                <h2>Mensajes Recibidos</h2>

                <!-- Estado: Sin mensajes -->

                <!-- <div class="empty-message">
            <i class="fa-solid fa-inbox" style="font-size: 40px; margin-bottom: 15px; display: block; color: #a98360;"></i>
            No se ha encontrado contenido. Aún no hay mensajes recibidos.
          </div> -->

                <!-- Estado: Con mensajes (Basado en la imagen) -->
                <table class="crud-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php

                        require_once './consultas.php';
                        $rsMsg = checkMsg();

                        while ($arrMsg = mysqli_fetch_array($rsMsg)) {

                            echo '<tr>
                                        <td>' . $arrMsg['nombre_usuario'] . '</td>
                                        <td>' . $arrMsg['correo'] . '</td>
                                        <td>' . $arrMsg['mensaje'] . '</td>
                                        <td>' . $arrMsg['timeStaps'] . '</td>
                                        <td class="actions">
                                            <a href="editar.php?id=1" class="btn-action" title="Editar"><i class="fa-regular fa-pen-to-square"></i></a>
                                            <a href="eliminar.php?id=1" class="btn-action" title="Eliminar"><i class="fa-regular fa-trash-can"></i></a>
                                        </td>
                                    </tr>
                                    ';
                        }


                        ?>



                    </tbody>
                </table>
            </div>
        </div>
    </main>
</body>

</html>