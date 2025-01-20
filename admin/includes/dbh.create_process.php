<?php
        include_once 'dbh.php';
        include_once 'classes.php';

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
        janela('index.php', '_self'); // retorna para janela de login
        exit();  
      }
/* fim validacao de sessao */



        $sql = "SELECT max(id_processo) as id_processo FROM `processo`";
        $result = mysqli_query($conn, $sql);
        $row = $result->fetch_assoc();
        $id_processo = $row['id_processo'] + 1;
        $data_criacao = date_create()->format('Y-m-d H:i:s');
        
        $sql = "INSERT INTO  `processo` (id_processo,data_criacao,versao,situacao_id,atualizado_por) values('$id_processo','$data_criacao','1','2','$usuario')";
        
        if (mysqli_query($conn, $sql)) {
                //pegando o id interno do novo processo que foi criado.
                $sql = "SELECT max(id) as id FROM `processo`";
                $result = mysqli_query($conn, $sql);
                $row = $result->fetch_assoc();
                $id = $row['id'];                
                echo $id;
        }       
        mysqli_close($conn);
?>