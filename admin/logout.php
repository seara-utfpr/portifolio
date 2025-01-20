<?php 

    function janela1($win, $alvo) {
        echo('<script language=javascript> window.open("' . $win . '", "'. $alvo . '"); </script>');
    }

    session_start();

    Unset($_SESSION['portfolio']);
    janela1('index.php', '_self');

?>