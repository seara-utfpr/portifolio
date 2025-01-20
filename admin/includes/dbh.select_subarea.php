<?php 
    include_once 'includes/dbh.php';

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


	$area = $_REQUEST['area'];
	$sql = "SELECT * FROM portfolio_de_processos_subarea WHERE related_area_id = $area ORDER BY 'descricacao';";
	$result = mysqli_query($conn, $sql);
	echo $sql;
	while ($row = mysqli_fetch_assoc($result) ) {
		$dbhselect_subarea[] = array(
			'id'	=> $row['id'],
			'descricao' => utf8_encode($row['descricao']),
		);
	}
	
	echo(json_encode($dbhselect_subarea));

?>