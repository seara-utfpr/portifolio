<?php
include_once 'includes/dbh.php';
include_once 'includes/sideMenu.php';

?>
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./style.css">
    <title>Portfolio de processos </title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />

    <!-- CKEditor Scripts -->
    <script src="https://cdn.ckeditor.com/ckeditor5/23.1.0/classic/ckeditor.js"></script>
    <script src="includes/ckeditor5/build/ckeditor.js"></script>

    <!-- Fonte Open Sans -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

</head>

<body>
    <?php if (isset($_GET['id'])) {
        try {
            $id = $_GET['id'];

            $sql = "SELECT * FROM processo WHERE id = $id";
            $result = mysqli_query($conn, $sql);
            $row = $result->fetch_assoc();
        } catch (PDOException $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
    } else {
        $row = [];
    }
    ?>

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

            <form action="includes/dbh.insert_process.php" method="post" id="register_form">
                <div class="tab">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="tablinks" onclick="openTab(event, 'info_geral')" id="defaultOpen" style="border:1px solid #ccc">Informações Gerais</a>
                        </li>
                        <li class="nav-item">
                            <a class="tablinks" onclick="openTab(event, 'info_rela')" style="border:1px solid #ccc">Informações Relacionadas</a>
                        </li>
                        <li class="nav-item">
                            <a class="tablinks" onclick="openTab(event, 'info_publi')" style="border:1px solid #ccc">Informaçoes de Publicação</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content" style="margin-top:16px;">
                    <div class="tabcontent" id="info_geral">
                        <div class="panel panel-default">
                            <div class="panel-heading">Informações Gerais</div>
                            <div class="panel-body">
                                <div class="form-group">
                                    <label class="field-description"> Nome do Processo</label>
                                    <input type="text" name="nome_processo" placeholder="Nome do Processo " value="<?php echo $row["nome_processo"]; ?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="field-description"> Codigo do Processo</label>
                                    <input type="text" name="codigo" placeholder="Codigo do Processo " value="<?php echo $row["codigo"]; ?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="field-description">Selecione uma Imagem do Processo</label>
                                    <input type="file" class="form-controll" id="process-image" value="<?php echo $row["imagem"]; ?>" class="form-control">
                                </div>
                                <div class="description">
                                    <label class="field-description"> Descrição </label>
                                    <textarea name="descricao" requerided id="editor" class="form-control"> <?php echo $row["descricao"]; ?></textarea>

                                </div>
                                <script>
                                    ClassicEditor
                                        .create(document.querySelector('#editor'))
                                        .catch(error => {
                                            console.error(error);
                                        });
                                </script>
                                <br>

                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="tabcontent" id="info_rela">
                        <div class="panel panel-default">
                            <div class="panel-heading">Informaçãoes Relacionados ao Processo</div>
                            <div class="panel-body">
                                <label class="field-description">Macro Processo</label>
                                <select name="macro_id" placeholder="Selecione">
                                    <?php
                                    $sql = "SELECT * FROM `portfolio_de_processos_macroprocesso`;";

                                    $result = mysqli_query($conn, $sql);

                                    if ($result) {
                                        while ($select_row = mysqli_fetch_assoc($result)) { ?>
                                            <option value="<?php echo $select_row['id']; ?>"> <?php echo $select_row['descricao']; ?> </option> <?php
                                                                                                                                            }
                                                                                                                                        } else {
                                                                                                                                            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                                                                                                                        }

                                                                                                                                                ?>
                                </select>
                                <br />
                                <label class="field-description">Area</label>
                                <select name="area_id" placeholder="Selecione">
                                    <?php
                                    $sql = "SELECT * FROM `portfolio_de_processos_area`;";

                                    $result = mysqli_query($conn, $sql);

                                    if ($result) {
                                        while ($select_row = mysqli_fetch_assoc($result)) { ?>
                                            <option value="<?php echo $select_row['id']; ?>"> <?php echo $select_row['descricao']; ?> </option> <?php
                                                                                                                                            }
                                                                                                                                        } else {
                                                                                                                                            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                                                                                                                        }

                                                                                                                                                ?>
                                </select>
                                <br />
                                <label class="field-description">Sub Area</label>
                                <select name="subarea_id" placeholder="Selecione">
                                    <?php
                                    $sql = "SELECT * FROM `portfolio_de_processos_subarea`;";

                                    $result = mysqli_query($conn, $sql);

                                    if ($result) {
                                        while ($select_row = mysqli_fetch_assoc($result)) { ?>
                                            <option value="<?php echo $select_row['id']; ?>"> <?php echo $select_row['descricao']; ?> </option> <?php
                                                                                                                                            }
                                                                                                                                        } else {
                                                                                                                                            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                                                                                                                        }

                                                                                                                                                ?>
                                </select>
                                <br />
                                <label class="field-description">Processo Pai</label>
                                <select name="parent_id" placeholder="Selecione">
                                    <?php
                                    $sql = "SELECT * FROM `processo`;";

                                    $result = mysqli_query($conn, $sql);

                                    if ($result) {
                                        while ($select_row = mysqli_fetch_assoc($result)) { ?>
                                            <option value="<?php echo $select_row['id']; ?>"> <?php echo $select_row['nome_processo']; ?> </option> <?php
                                                                                                                                            }
                                                                                                                                        } else {
                                                                                                                                            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                                                                                                                        }

                                                                                                                                                ?>
                                </select>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="tabcontent" id="info_publi">
                        <div class="panel panel-default">
                            <div class="panel-heading">Preencha Informaçãoes de Publicação</div>
                            <div class="panel-body">
                                <label class="field-description">Situação</label>
                                <select name="situacao" placeholder="Selecione">
                                    <?php
                                    $sql = "SELECT * FROM `portfolio_de_processos_situacao`;";

                                    $result = mysqli_query($conn, $sql);

                                    if ($result) {
                                        while ($select_row = mysqli_fetch_assoc($result)) { ?>
                                            <option value="<?php echo $select_row['id']; ?>"> <?php echo $select_row['nome']; ?> </option> <?php
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                                                                                                                    }

                                                                                                                                            ?>
                                </select>
                                <div class="form-group">
                                    <label class="field-description"> Ultrapassado</label>
                                    <input type="checkbox" name="outdated" value="<?php echo $row["is_outdated"]; ?>" <?php if (isset($_POST['outdated'])) echo "checked='checked'"; ?> />
                                    <?php
                                    if (isset($_POST['outdated'])) {
                                        //$stok is checked and value = 1
                                        $outdated = $_POST['outdated'];
                                    } else {
                                        //$stok is nog checked and value=0
                                        $outdated = 0;
                                    }
                                    ?>
                                </div>
                                <div class="form-group">
                                    <label class="field-description"> Responsavel pelo Processo</label>
                                    <input type="text" name="responsavel" placeholder="Responsavel" value="<?php echo $row["responsavel"]; ?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="field-description"> Email</label>
                                    <input type="text" name="email" placeholder="Email" value="<?php echo $row["email"]; ?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="field-description">Telefone</label>
                                    <input type="text" name="telefone" placeholder="Telefone" value="<?php echo $row["telefone"]; ?>" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="field-description"> Ramal</label>
                                    <input type="text" name="ramal" placeholder="Ramal" value="<?php echo $row["ramal"]; ?>" class="form-control">
                                </div>


                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" name="submit" class="primary-btn"> Salvar </button>
            </form>
        </div>
    </div>
    <script>
        document.getElementById("defaultOpen").click();

        function openTab(evt, tabName) {
            // Declare all variables
            var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    </script>

</body>

</html>