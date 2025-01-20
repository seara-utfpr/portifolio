<?php
        include_once 'dbh.php';
        include_once 'classes.php';
        
        $aba = $_POST['aba'];

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
$nome_processo = $_POST['nome_processo'];
$parent_id = $_POST['parent_id'];
$descricao = $_POST['descricao'];
$data_ultima_atualizacao = date_create()->format('Y-m-d H:i:s');


$responsavel = $_POST['responsavel'];
$solicitante = $_POST['solicitante'];
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$base_conhecimento = $_POST['base_conhecimento'];                        
$pasta_trabalho = $_POST['pasta_trabalho'];
$responsavel_ep = $_POST['responsavel_ep'];
$data_ultima_atualizacao = date_create()->format('Y-m-d H:i:s');
$atualizado_por = $usuario;
$observacao = $_POST['observacao'];
$macro = $_POST['macro'];
$tipo_macro = $_POST['tipo_macro'];


$sql = "SELECT * FROM `processo` WHERE id = $id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result))
{
        $sql = "UPDATE `processo`
        SET nome_processo = '$nome_processo', atualizado_por='$usuario', parent_id='$parent_id', 
        descricao='$descricao', data_ultima_atualizacao='$data_ultima_atualizacao',
        responsavel = '$responsavel', solicitante='$solicitante',
        telefone='$telefone', email='$email', base_conhecimento='$base_conhecimento',
        pasta_trabalho='$pasta_trabalho',  
        responsavel_ep='$responsavel_ep', data_ultima_atualizacao='$data_ultima_atualizacao',  
        atualizado_por='$atualizado_por', observacao='$observacao', macro ='$macro', tipo_macro='$tipo_macro' 
        WHERE id='$id'";

        if (mysqli_query($conn, $sql)) {
                echo "OK";
                //header("location: ../process_list.php?saveProcess=sucess");
          } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }    
}
else{
        echo "processo não encontrado";
}       

/*

        switch ($aba) {
                case 1:

                        $id = $_POST['id'];
                        $nome_processo = $_POST['nome_processo'];
                        $parent_id = $_POST['parent_id'];
                        $descricao = $_POST['descricao'];
                        $data_ultima_atualizacao = date_create()->format('Y-m-d H:i:s');

                        $sql = "SELECT * FROM `processo` WHERE id = $id";
                        $result = mysqli_query($conn, $sql);

                        if (mysqli_num_rows($result)){
                                $sql = "UPDATE `processo`
                                SET nome_processo = '$nome_processo', atualizado_por='$usuario', parent_id='$parent_id', 
                                descricao='$descricao', data_ultima_atualizacao='$data_ultima_atualizacao'  
                                 WHERE id='$id'";

                                if (mysqli_query($conn, $sql)) {
                                        header("location: ../process_list.php?saveProcess=sucess");
                                  } else {
                                        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                }     
                        }       

                    break;
                case 2:
                        $id = $_POST['id'];
                        $responsavel = $_POST['responsavel'];
                        $solicitante = $_POST['solicitante'];
                        $telefone = $_POST['telefone'];
                        $email = $_POST['email'];
                        $base_conhecimento = $_POST['base_conhecimento'];                        
                        $pasta_trabalho = $_POST['pasta_trabalho'];
                        $responsavel_ep = $_POST['responsavel_ep'];
                        $data_ultima_atualizacao = date_create()->format('Y-m-d H:i:s');
                        $atualizado_por = $usuario;
                        $observacao = $_POST['observacao'];

                        $sql = "SELECT * FROM `processo` WHERE id = $id";
                        $result = mysqli_query($conn, $sql);

                        if (mysqli_num_rows($result)){
                                $sql = "UPDATE `processo`";
                                $sql .= " SET responsavel = '$responsavel', solicitante='$solicitante',";
                                $sql .= " telefone='$telefone', email='$email', base_conhecimento='$base_conhecimento', pasta_trabalho='$pasta_trabalho', ";  
                                $sql .= " responsavel_ep='$responsavel_ep', data_ultima_atualizacao='$data_ultima_atualizacao',";  
                                $sql .= " atualizado_por='$atualizado_por', observacao='$observacao' ";
                                $sql .= " WHERE id_processo='$id'";

                                if (mysqli_query($conn, $sql)) {
                                        header("location: ../process_list.php?saveProcess=sucess");
                                  } else {
                                        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                }     
                        }  

                    break;
                case 4:
                    echo "i equals 2";
                    break;
        }*/

        mysqli_close($conn);