<?php
/*
* Universidade Tecnológica Federal do Paraná 
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Busca Imagem para mostrar.
* Versão:1 Data de criação: 06/04/2022
*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-type: text/html; charset=utf-8"); 

include_once 'dbh.php';

function getMimeType($image_src)
{
	$image = base64_decode($image_src);

	$f = finfo_open();

	$mime_type = finfo_buffer($f, $image, FILEINFO_MIME_TYPE);
	 
	return $mime_type;	
}

function janela($win, $alvo) {
    echo('<script language=javascript> window.open("' . $win . '", "'. $alvo . '"); </script>');
  }

$id =  $_POST['id'];

//Buscar dados das Imagens cadastradas para o processo
	$imagens =[];
	$sql_imagens = "SELECT * FROM imagem_processo WHERE id=$id";
	$result_imagens = mysqli_query($conn, $sql_imagens);

	if ($result_imagens)
	{
		$count = 0;
	
		while ($select_row = mysqli_fetch_assoc($result_imagens))
		{
			$imagens[$count]['id'] = $select_row['id'];
			$imagens[$count]['nome'] = $select_row['nome'];
			$imagens[$count]['img'] = $select_row['img'];
			$count++;		
		}	
	}	
	foreach ($imagens as $value)
    {   
		$mimeType = getMimeType($value['img']);
		//echo $mimeType;
		echo 'data:'.$mimeType.';base64,' . $value['img'];			
	}
?>