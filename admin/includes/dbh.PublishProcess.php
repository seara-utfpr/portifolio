<?php
        include_once 'dbh.php';
        include_once 'classes.php';

        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
      
        /* inicio validacao de sessao */
function janela($win, $alvo) {
        echo('<script language=javascript> window.open("' . $win . '", "'. $alvo . '"); </script>');
      }
      
      session_start();
      //validando se está logado e se tempo inativo nao e maior que 30 minutos.
      if ($_SESSION['portfolio']['logado'] == 'SIM' && (time() - $_SESSION['portfolio']['tempoLogado'] <= 1800 ))
      {
        
        //buscando dados da sessao.
        $usuario = $_SESSION['portfolio']['usuario'];  
        //atualizando a hora para renovar o tempo de inatividade.
        $_SESSION['portfolio']['tempoLogado'] = time();
        
      }
      else
      {
        //retorna ao menu de login.
        Unset($_SESSION['portfolio']); // encerra a sessao.
        janela('index.php', '_parent'); // retorna para janela de login
        exit();  
      }
/* fim validacao de sessao */

        $id = $_POST['id'];
        $sql = "SELECT id_processo FROM processo WHERE id=$id";
        $result = mysqli_query($conn, $sql);
        $select_row = mysqli_fetch_assoc($result);
        $id_processo = $select_row['id_processo'];

        //Revogando os processos do mesmo tipo que estão ativos.
        $sql = "UPDATE processo SET situacao_id = '3'  WHERE id_processo =$id_processo";
        $result = mysqli_query($conn, $sql);
        
        //Mudando a situação do novo processo a ser publicado para ativo e atualizando a data de publicação
        $sql = "UPDATE processo SET situacao_id = '1',data_publicacao=now(), atualizado_por='$usuario'  WHERE id =". $id;
        $result = mysqli_query($conn, $sql); 

        mysqli_close($conn);
?>