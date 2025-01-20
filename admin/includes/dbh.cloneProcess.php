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

        $sql = "SELECT * FROM `processo` WHERE id = $id";
        $result1 = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result1)){
 
                $sql = "SELECT id_processo, versao FROM `processo` WHERE id = $id";
                $result = mysqli_query($conn, $sql);
                $row = $result->fetch_assoc();
                
                $id_processo1 = $row['id_processo'];
                $versao = $row['versao'] + 1;
                $data_criacao = date_create()->format('Y-m-d H:i:s');

            
                //valida se ja nao existe um registro de versao para o mesmo processo
                $sql = "SELECT id FROM `processo` WHERE versao_anterior_id='$id'";
                $result = mysqli_query($conn, $sql);

                //caso nao exista registro de versao para o mesmo processo
                $select_row = mysqli_fetch_assoc($result);
                if(!$select_row)
                {
                        $sql = "INSERT INTO  `processo` (id_processo,data_criacao,versao,situacao_id,atualizado_por) 
                                values('$id_processo1','$data_criacao','$versao','2','$usuario')";
                        
                        if (mysqli_query($conn, $sql))
                        {
                                //pega o ID da nova versao para atualizar os dados dela.
                                $sql = "SELECT max(id) AS id FROM processo";
                                $result = mysqli_query($conn, $sql);
                                $row = $result->fetch_assoc();
                                $id_novo = $row['id'];

                                foreach ($result1 as $row) :
                                
                                        $nome_processo = $row['nome_processo'];
                                        $parent_id = $row['parent_id'];
                                        $descricao = $row['descricao'];
                                        $data_ultima_atualizacao = $row['data_ultima_atualizacao'];
                                        $responsavel = $row['responsavel'];
                                        $solicitante = $row['solicitante'];
                                        $telefone = $row['telefone'];
                                        $email = $row['email'];
                                        $base_conhecimento = $row['base_conhecimento'];
                                        $pasta_trabalho = $row['pasta_trabalho'];
                                        $responsavel_ep = $row['responsavel_ep'];
                                        $observacao = $row['observacao'];
                                        $macro = $row['macro'];                                        

                                        $sql = "UPDATE `processo`
                                                SET nome_processo = '$nome_processo', 
                                                    parent_id='$parent_id', 
                                                    descricao='$descricao',
                                                    data_ultima_atualizacao='$data_ultima_atualizacao',
                                                    responsavel = '$responsavel', 
                                                    solicitante='$solicitante',
                                                    telefone='$telefone', 
                                                    email='$email', 
                                                    base_conhecimento='$base_conhecimento',
                                                    pasta_trabalho='$pasta_trabalho', 
                                                    responsavel_ep='$responsavel_ep', 
                                                    observacao='$observacao', 
                                                    macro='$macro', 
                                                    versao_anterior_id='$id'       
                                                WHERE id='$id_novo'";

                                        if (mysqli_query($conn, $sql))
                                        {
                                            //pegando o id interno do novo processo que foi criado.
                                            $sql = "SELECT max(id) as id FROM `processo`";
                                            $result = mysqli_query($conn, $sql);
                                            $row = $result->fetch_assoc();
                                            $id = $row['id'];                
                                            echo $id;
                                        }
                                        else{
                                                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                                        }
                                endforeach;
                         }
                }
                else //já existe registro.
                {
                   echo $select_row['id'];
                }                               
        }
        mysqli_close($conn);
?>