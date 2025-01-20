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

        $id = $_POST['id'];

        $sql = "DELETE FROM `processo` WHERE id = $id";
        $result1 = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result1))
        {
                //apagando as imagens relacionadas ao processo que estejam cadastradas.
                $sql = "DELETE FROM `imagem_processo` WHERE id_processo = $id";
                $result1 = mysqli_query($conn, $sql);
                
                if (mysqli_num_rows($result1))
                {   
                   mysqli_close($conn);
                   echo 'success';
                }
                else //não foi possível excluir.
                {
                   echo 'error';
                }
        }
        else //não foi possível excluir.
        {
                echo 'error';
        }                                       
?>