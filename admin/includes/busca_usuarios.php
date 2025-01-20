<?php
/*
* Universidade Tecnológica Federal do Paraná 
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Versão:1 Data de criação: 07/06/2021 
*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-type: text/html; charset=utf-8"); 

include_once 'dbh.php';

$NomeUsuario =  $_POST['NomeUsuario'];
$Login =  $_POST['login_user'];

//verificando se ao menos um dos campos de pesquisa contém dados para montar a query corretamente
if($NomeUsuario != "" || $Login != "")
{
    $where = " WHERE ";
    if($NomeUsuario != "" )
    {
        $where .= " nome like'%".$NomeUsuario."%'";  
        if($Login != "" )
        {
            $where .= " AND login = '".$Login."'";              
        }        
    }
    else
    { 
        if($Login != "" )
        {
             $where .= " login = '".$Login."'";  
        }        
    }    
}
else
    { 
        $where = '';
    }    

//query para buscar os dados dos Processos.

$sql = "SELECT u.*, p.nome as perfil from usuarios AS u INNER JOIN permissoes p ON p.id=u.perfil  ".$where;

    
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

            array( 'db' => 'id', 'dt' => 0 ),
            array( 'db' => 'login', 'dt' => 1 ),
            array( 'db' => 'nome',  'dt' => 2 ),
            array( 'db' => 'perfil',   'dt' => 3),
            array( 'db' => 'ativo', 'dt' => 4,),
            array( 'db' => 'data_inicio','dt' => 5),
            array( 'db' => 'data_fim','dt' => 6),                         
            array( 'db' => 'acao','dt' => 7)
        );
   
    //buscando dados no banco de dados    
        $result = mysqli_query($conn, $sql);

    //montando array com as linhas    
        foreach ($result as $row) : 
            
            $id=$row['id']; 
            $login=$row['login']; 
            $nome=$row['nome'];
            $perfil=$row['perfil'];
            $ativo=$row['ativo'];

            $data_inicio= date_format(date_create($row['data_inicio']), 'd-m-Y H:i:s');
          
            if($row['data_fim'])
            {
                $data_fim= date_format(date_create($row['data_fim']), 'd-m-Y H:i:s');                
            }
            else
            {
                $data_fim="";
            }           


            $acao = '<button type="button"  title="Editar" class="btn btn-outline-primary view_user"  id="'.$row["id"].'">';
            $acao .= '<i class="bi bi-pencil"></i></button>';
            $acao .= '&nbsp;&nbsp;<button type="button"  title="Desabilitar" class="btn btn-outline-danger delete_user"  id="'.$row["id"].'">';
            $acao .= '<i class="bi bi-trash"></i></button>';
           
            $posts[] = array('id' => $id, 
                             'login' => $login,
                             'nome' => $nome,
                             'perfil' => $perfil,
                             'ativo' => $ativo,
                             'data_inicio' => $data_inicio,
                             'data_fim' => $data_fim,
                             'acao' => $acao
                            );
                            
        endforeach;         
        
        //montando  array de retorno no formato para o datatable  
        $recordsTotal = 0;
        $recordsFiltered = 0;        

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
