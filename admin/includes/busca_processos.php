<?php
/*
* Universidade Tecnológica Federal do Paraná 
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Versão:1 Data de criação: 20/05/2021 
*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-type: text/html; charset=utf-8"); 

include_once 'dbh.php';

function janela($win, $alvo) {
    echo('<script language=javascript> window.open("' . $win . '", "'. $alvo . '"); </script>');
  }
session_start();
//validando se está logado e se tempo inativo nao e maior que 30 minutos.
if ($_SESSION['portfolio']['logado'] == 'SIM' && (time() - $_SESSION['portfolio']['tempoLogado'] <= 1800 ))
{
  
  //buscando dados da sessao.
  $usuario = $_SESSION['portfolio']['usuario'];  
  $perfil =  $_SESSION['portfolio']['perfil']; 
  
}
else
{
  //retorna ao menu de login.
  Unset($_SESSION['portfolio']); // encerra a sessao.
  janela('index.php', '_parent'); // retorna para janela de login
  exit();  
}
/* fim validacao de sessao */

$NomeProcesso =  $_POST['NomeProcesso'];
$macro_id =  $_POST['macro_id'];
$situacao_id =  $_POST['situacao_id'];

//verificando se ao menos um dos campos de pesquisa contém dados para montar a query corretamente
if($situacao_id != "" || $NomeProcesso != "" || $macro_id !="" )
{
    $where = " WHERE ";
    if($situacao_id != "" )
    {
        $where .= " p.situacao_id='".$situacao_id."'";  
        if($NomeProcesso != "" )
        {
            $where .= " AND p.nome_processo like '%".$NomeProcesso."%'";  
            
            if($macro_id != "" )
            {
                $where .= " AND p.parent_id = '".$macro_id."'"; 
            }
        }
        else
        {
            if($macro_id != "" )
            {
                $where .= " AND p.parent_id = '".$macro_id."'";                 
            }
        }
    }
    else
    { 
        if($NomeProcesso != "" )
        {
             $where .= " p.nome_processo like '%".$NomeProcesso."%'";  
             if($macro_id != "" )
             {
                $where .= " AND p.parent_id = '".$macro_id."'";                 
             }
        }
        else
        { 
            if($macro_id != "" )
            {
              $where .= " p.parent_id = '".$macro_id."'";  
            }              
        }    
    }    
}
else
    { 
        $where = '';
    }    

//query para buscar os dados dos Processos.

$sql = "SELECT DISTINCT p.id, p.id_processo, p.nome_processo AS nome_processo, CONCAT(SUBSTRING(p.descricao,1,50),'...') AS descricao, p.versao AS versao ,
        mp.nome_processo AS macroprocesso, s.nome AS situacao, p.situacao_id AS situacao_id,p.macro AS flag_macro
        FROM `processo` AS p 
        LEFT JOIN portfolio_de_processos_situacao s ON s.id=p.situacao_id
        LEFT JOIN processo  mp ON mp.id_processo=p.parent_id".$where;				

//funcao para formatacao das colunas de acordo com padrao para o datatable
function data_output ( $columns, $data )
{
	$out = array();
    
    for ( $i=0, $ien=count($data) ; $i<$ien ; $i++ )
    {
		$row = array();

		for ( $j=0, $jen=count($columns) ; $j<$jen ; $j++ )
        {
			$column = $columns[$j];

			// Is there a formatter?
			if ( isset( $column['formatter'] ) )
            {
				$row[ $column['dt'] ] = $column['formatter']( $data[$i][ $column['db'] ], $data[$i] );
			}
			else
            {
				$row[ $column['dt'] ] = $data[$i][ $columns[$j]['db'] ];
			}
		}
		$out[] = $row;
	}
	return $out;
}

 try {



    //estrutura das colunas para o retorno e montagem da tabela
        $columns = array(
            array( 'db' => 'nome_processo', 'dt' => 0 ),
            array( 'db' => 'descricao',  'dt' => 1 ),
            array( 'db' => 'macroprocesso', 'dt' => 2 ),
            array( 'db' => 'versao',   'dt' => 3),
            array( 'db' => 'flag_macro', 'dt' => 4,),
            array( 'db' => 'situacao', 'dt' => 5,),
            array( 'db' => 'acao','dt' => 6)                         
        );
        //$data= array();
    

    //buscando dados no banco de dados    
        $result = mysqli_query($conn, $sql);

    //montando array com as linhas    
        foreach ($result as $row) : 
            
            $nome_processo=$row['nome_processo']; 
            $macroprocesso=$row['macroprocesso']; 
            $descricao=$row['descricao'];
            $versao=$row['versao'];
            $situacao=$row['situacao'];
            $flag_macro=$row['flag_macro'];

            //Verificando a Situação do Processo
            switch ($row["situacao_id"])
            {
                //Publicado
                case 1:
                    $acao  = '<button type="button" class="btn btn-outline-primary view_data"  id="'.$row["id"].'" title="Detalhes">';
                    $acao .= ' <i class="bi bi-search"></i></button>';                    
                    $acao .= '&nbsp;&nbsp;<button type="button"  title="Criar Nova Versão" class="btn btn btn-outline-success  new_version"  id="'.$row["id"].'">';
                    $acao .= '<i class="bi bi-plus-lg"></i>';
                break;
                
                //Em edição
                case 2:
                    $acao = '<button type="button"  title="Editar" class="btn btn-outline-primary view_data"  id="'.$row["id"].'">';
                    $acao .= '<i class="bi bi-file-earmark-font"></i></button>';

                    //somente admin pode publicar ou excluir processo no portal para uso geral
                    if($perfil == 'Admin')
                    {  
                        $acao .= '&nbsp;&nbsp;<button type="button"  title="Publicar" class="btn btn-outline-success publicar_data"  id="'.$row["id"].'">';
                        $acao .= '<i class="bi bi-file-earmark-arrow-up"></i></button>';
                    
                        $acao .= '&nbsp;&nbsp;<button type="button"  title="Excluir" class="btn btn-outline-danger delete_data"  id="'.$row["id"].'">';
                        $acao .= '<i class="bi bi-trash"></i></button>';
                    }
                break;

                //Revogado
                case 3:
                    $acao  = '<button type="button" class="btn btn-outline-primary view_data"  id="'.$row["id"].'" title="Detalhes">';
                    $acao .= ' <i class="bi bi-search"></i></button>';
                break;
            }           

            $posts[] = array('nome_processo' => $nome_processo, 
                             'descricao' => $descricao,
                             'macroprocesso' => $macroprocesso,
                             'versao' => $versao,
                             'flag_macro' => $flag_macro,
                             'situacao' => $situacao,
                             'acao' => $acao
                            );
                            
        endforeach;         
        //montando  array de retorno no formato para o datatable  
        $recordsTotal = 0;
        $recordsFiltered = 0;
  
        //$posts[] = array();

        $retorno =  array(
                "draw"            => '1',
                "recordsTotal"    => intval( $recordsTotal ),
                "recordsFiltered" => intval( $recordsFiltered ),
                "data"            => data_output( $columns, $posts )
        );            
       

      //retornando os dados formatados em json
      echo json_encode( $retorno );
      

     } catch (PDOException $error) {
        echo $sql . "<br>erro:" . $error->getMessage();
        die();    
     }

?>