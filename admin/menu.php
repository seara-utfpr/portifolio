<?php
include_once 'includes/dbh.php';
include_once 'includes/sideMenu.php';

?>
<!DOCTYPE html>

<head>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="./style.css">
    <title>Portfolio de processos </title>

    <!-- CKEditor Scripts -->
    <script src="https://cdn.ckeditor.com/ckeditor5/23.1.0/classic/ckeditor.js"></script>
    <script src="includes/ckeditor5/build/ckeditor.js"></script>

    <!-- Fonte Open Sans -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

</head>

<body>

    <div class="header grid grid-center gap grid-template-three-columns grid-auto-flow-row-3">
        <div class="item">
            <span class="inline">
                <img src='assets/utflogo.png' alt="UTFPR logo" class="horizontal-logo">
            </span>
            <img src='assets/eproclogo.png' alt="Eproc logo" class="vertical-logo">

        </div>

        <div class="item">
            <h1 class="inline title">
                Portfólio de Processos
            </h1>
        </div>
        <div class="item">
            <a href=""><button type="button" class="secondary-btn inline">Cadastrar</button></a>
            <a href=""><button type="button" class="secondary-btn btn-border inline">Entrar</button></a>
        </div>

    </div>
    <div>
        <div class="content grid gap grid-template-two-colums grid-auto-flow-row-2 font" style="background-color: #f1f1f1">
            <div class="iem menu">
                <span>Menu</span>

                <ul class="menu-content">
                    <?php
                    renderMenu($conn);
                    ?>
                </ul>
            </div>
            <div class="main-content">
                <label class="inline title">Painel de Controle</label>
                <br><br>
                <button onclick="window.location.href='process_list.php'" class="primary-btn">Listar Processos</button>

                <button onclick="window.location.href='macro_list.php'" class="primary-btn">Listar Macroprocessos</button>

                <button onclick="window.location.href='area_list.php'" class="primary-btn">Listar Areas</button>

                <button onclick="window.location.href='subarea_list.php'" class="primary-btn">Listar Sub Areas</button>

                <br>
                <button onclick="window.location.href='process_form.php'" class="primary-btn">Cadastrar Processo</button>

                <button onclick="window.location.href='macro_form.php'" class="primary-btn">Cadastrar Macroprocesso</button>

                <button onclick="window.location.href='area_form.php'" class="primary-btn">Cadastrar Area</button>

                <button onclick="window.location.href='subarea_form.php'" class="primary-btn">Cadastrar Sub Area</button>


            </div>
        </div>

</body>

</html>