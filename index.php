
<?php

// ==================================================
// CONFIGURACIÓN
// ==================================================

$root = realpath($_SERVER['DOCUMENT_ROOT']);

if ($root === false) {
    http_response_code(500);
    exit('No se pudo determinar el directorio raíz');
}

// ==================================================
// OBTENER RUTA SOLICITADA
// ==================================================

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rawurldecode($uri);

// Bloquear archivos y directorios ocultos
$parts = explode('/', $path);

foreach ($parts as $part) {
    if ($part !== '' && str_starts_with($part, '.')) {
        http_response_code(404);
        exit('404 - No encontrado');
    }
}

// ==================================================
// RESOLVER RUTA REAL
// ==================================================

$target = realpath(
    $root . DIRECTORY_SEPARATOR . ltrim($path, '/')
);

// Evitar salir del directorio raíz
if (
    $target === false ||
    (
        $target !== $root &&
        strpos($target, $root . DIRECTORY_SEPARATOR) !== 0
    )
) {
    http_response_code(404);
    exit('404 - No encontrado');
}

// ==================================================
// ARCHIVOS: PHP, CSS, JS, IMÁGENES, ETC.
// ==================================================

// Si es un archivo existente, dejar que PHP lo entregue
if (is_file($target)) {
    return false;
}

// ==================================================
// EXPLORADOR DE DIRECTORIOS
// ==================================================

if (is_dir($target)) {

    // Buscar archivo de inicio
    foreach (['index.php', 'index.html'] as $index) {

        if (is_file($target . DIRECTORY_SEPARATOR . $index)) {
            return false;
        }
    }

    // Obtener contenido del directorio
    $items = scandir($target);

    // Ruta relativa actual
    $relative = trim(
        substr($target, strlen($root)),
        DIRECTORY_SEPARATOR
    );

    // Calcular directorio padre
    $parent = dirname($relative);

    if ($parent === '.') {
        $parent = '';
    }

    // Construir URL para subir
    $parentUrl = '/' . (
        $parent !== ''
            ? str_replace('%2F', '/', rawurlencode($parent)) . '/'
            : ''
    );

    // ==================================================
    // HTML
    // ==================================================

    echo '<!DOCTYPE html>';
    echo '<html lang="es">';
    echo '<head>';

    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';

    echo '<title>Explorador de archivos</title>';

    // ==================================================
    // CSS DEL EXPLORADOR
    // ==================================================

    echo '<style>

        * {
            box-sizing: border-box;
        }

        body {
            font: 15px Arial, sans-serif;
            max-width: 950px;
            margin: 40px auto;
            padding: 0 20px;
            background: #f3f4f6;
            color: #222;
        }

        .container {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 10px #0001;
        }

        h2 {
            margin-top: 0;
        }

        .breadcrumb {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 18px;
            overflow-wrap: anywhere;
        }

        .up {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            text-decoration: none;
            margin-bottom: 15px;
        }

        .up:hover {
            background: #1d4ed8;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            border-bottom: 1px solid #eee;
            padding: 12px 8px;
        }

        li:last-child {
            border: none;
        }

        a {
            color: #2563eb;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .folder {
            font-weight: bold;
        }

        .file {
            color: #444;
        }

    </style>';

    echo '</head>';
    echo '<body>';

    echo '<div class="container">';

    echo '<h2>📂 Explorador de archivos</h2>';

    // ==================================================
    // UBICACIÓN ACTUAL
    // ==================================================

    echo '<div class="breadcrumb">';

    echo '<strong>Ubicación:</strong> /' .
        htmlspecialchars($relative, ENT_QUOTES, 'UTF-8');

    echo '</div>';

    // ==================================================
    // BOTÓN SUBIR DIRECTORIO
    // ==================================================

    if ($relative !== '') {

        echo '<a class="up" href="' .
            htmlspecialchars($parentUrl, ENT_QUOTES, 'UTF-8') .
            '">⬆ Subir un nivel</a>';
    }

    // ==================================================
    // LISTADO DE ARCHIVOS Y CARPETAS
    // ==================================================

    echo '<ul>';

    foreach ($items as $item) {

        // Ignorar entradas especiales y ocultas
        if (
            $item === '.' ||
            $item === '..' ||
            str_starts_with($item, '.')
        ) {
            continue;
        }

        $full = $target . DIRECTORY_SEPARATOR . $item;

        $href = rawurlencode($item);

        if (is_dir($full)) {

            $href .= '/';

            $icon = '📁';

            $class = 'folder';

        } else {

            $icon = '📄';

            $class = 'file';
        }

        echo '<li>';

        echo $icon . ' <a class="' . $class . '" href="' .
            htmlspecialchars($href, ENT_QUOTES, 'UTF-8') . '">' .
            htmlspecialchars($item, ENT_QUOTES, 'UTF-8') .
            '</a>';

        echo '</li>';
    }

    echo '</ul>';

    echo '</div>';

    echo '</body>';
    echo '</html>';

    exit;
}

// ==================================================
// OTROS CASOS
// ==================================================

http_response_code(404);
exit('404 - No encontrado');

