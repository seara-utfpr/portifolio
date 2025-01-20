<?php
/*
* Universidade Tecnológica Federal do Paraná 
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Arquivo: Visualização  Publica de dados dos Processos  
* Versão:1 Data de criação: 17/03/2022 
* Última alteração realizada em 20/07/2022 	
*/

/* Informa o nível dos erros que serão exibidos */
error_reporting(E_ALL);
/* Habilita a exibição de erros */
ini_set("display_errors", 1);

include_once 'dbh.php';
//Realizando parser do XML para montagem do Menu.
function getBpmn($xml)
{
	return $xml['img'];
}
//pegando o caminho da arvore do Processo
function get_path($id_processo)
{ 
    include 'dbh.php';
	// Buscando o pai  para este processo - processos em edição apenas
	$query  ="SELECT parent_id,nome_processo,id_processo FROM processo WHERE id_processo ='".$id_processo."' and situacao_id =2"; 
    $result = mysqli_query($conn,$query);
	$linha = mysqli_fetch_assoc($result);
    // save the path in this array 
    $path = array(); 
    // only continue if this $node isn't the root node 
    // (that's the node with no parent) 
    if ($linha['parent_id']!='') { 
        // the last part of the path to $node, is the name 
        // of the parent of $node 
		$path2 = array(); 
		$path2['nome_processo'] = $linha['nome_processo']; 
		$path2['parent_id'] = $linha['parent_id'];
		$path2['id_processo'] = $linha['id_processo']; 
        $path[] = $path2;
        // we should add the path to the parent of this node 
        // to the path 
        $path = array_merge(get_path($linha['parent_id']), $path); 
    } 
    // return the path 
	   return $path; 
} 

function monta_arvore($path,$id_processo)
{
	$result = '';

	foreach($path as $caminho) {
		if($caminho["id_processo"]==$id_processo)
		{
			$result.= $caminho["nome_processo"];
		}
		else
		{
			$result.= '<a href="Processo.php?id_processo='.$caminho["id_processo"].'" target="_self">'.$caminho["nome_processo"].'</a>/';	
		}
	}	
	return $result;
}

 //execução principal
 //carregando menu dos macroprocessos
 $id_processo = $_GET['id_processo'];
 if($id_processo)
 {

		$query  ="SELECT p.id as id ,p.id_processo as id_processo ,p.nome_processo as nome_processo,p.descricao as descricao,p.versao as versao ,p.data_publicacao as data_publicacao ,p.macro as macro, p.responsavel as responsavel, p1.nome_processo as nome_processo_pai
		FROM processo p LEFT JOIN processo p1 ON p.parent_id=p1.id_processo 
		WHERE p.id_processo ='".$id_processo."' and p.situacao_id='2'
		UNION
		SELECT p.id as id ,p.id_processo as id_processo ,p.nome_processo as nome_processo,p.descricao as descricao,p.versao as versao ,p.data_publicacao as data_publicacao ,p.macro as macro, p.responsavel as responsavel, p1.nome_processo as nome_processo_pai
		FROM processo p LEFT JOIN processo p1 ON p.parent_id=p1.id_processo 
		WHERE p.id_processo ='".$id_processo."' and p.situacao_id='1'
		";
		
		$result = mysqli_query($conn,$query);
		$row = $result->fetch_assoc();  	
		
		$id_processo = $row['id_processo'];
		$id = $row['id'];
		$nome_processo = $row['nome_processo'];
		if($row['nome_processo_pai'] !=""){ $nome_processo_pai = $row['nome_processo_pai']; } else { $nome_processo_pai = '-';}
		$responsavel = $row['responsavel'];
		$descricao = $row['descricao'];
		$dataPublicacao = date_format(date_create($row["data_publicacao"]), 'd-m-Y H:i:s');
		$versao = $row['versao'];
		$macro= $row['macro'];

		//Buscar dados das Imagens cadastradas para o processo
		$imagens =[];	
		// verificar se processo não é um Macroprocesso - neste caso deverá listar todas as imagens dos mapeamentos filhos 
		/*if($macro == 'S')
		{	
			$sql_imagens = "SELECT * FROM imagem_processo WHERE id_processo IN ( SELECT id_processo FROM processo WHERE parent_id = $id_processo ) order by nome asc";
			
		}*/
		$sql_imagens = "SELECT * FROM imagem_processo WHERE id_processo = $id";
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
		$arvore = monta_arvore(get_path($id_processo),$id_processo);
}
else
{
		echo 'Processo não localizado ou Publicado.';
}

	//buscando processos relacionados;
	$processosrelacionados ='';
	$sql = "SELECT pr.id_processo2 as id_processoRelacionado,p.nome_processo as nome_processoRelacionado FROM processo_relacionado pr INNER JOIN processo p ON p.id_processo = pr.id_processo2  WHERE id_processo1 =".$id_processo;
	$resultRelacionados = mysqli_query($conn,$sql);
    
	if ($resultRelacionados->num_rows >0) 
	{
		$contador=1;
		//montando array com as linhas    
        foreach ($resultRelacionados as $row_relacionados) :
			if ($contador == $resultRelacionados->num_rows)  
			{
				$processosrelacionados.= '<a href="Processo.php?id_processo='.$row_relacionados["id_processoRelacionado"].'" target="_self">'.$row_relacionados["nome_processoRelacionado"].'</a>'; 				
			}
			else
			{
				$processosrelacionados.= '<a href="Processo.php?id_processo='.$row_relacionados["id_processoRelacionado"].'" target="_self">'.$row_relacionados["nome_processoRelacionado"].'</a>, '; 			
			}
			
			$contador++;
		endforeach;   
	}
	else
	{
		$sql = "SELECT pr.id_processo1 as id_processoRelacionado,p.nome_processo as nome_processoRelacionado  FROM processo_relacionado pr INNER JOIN processo p ON p.id_processo = pr.id_processo1  WHERE id_processo2 =".$id_processo;
		$resultRelacionados = mysqli_query($conn,$sql);
		if ($resultRelacionados->num_rows >0) 
		{
			$contador=1;
			//montando array com as linhas    
			foreach ($resultRelacionados as $row_relacionados) :
				if ($contador == $resultRelacionados->num_rows)  
				{
					$processosrelacionados.= '<a href="Processo.php?id_processo='.$row_relacionados["id_processoRelacionado"].'" target="_self">'.$row_relacionados["nome_processoRelacionado"].'</a>'; 				
				}
				else
				{
					$processosrelacionados.= '<a href="Processo.php?id_processo='.$row_relacionados["id_processoRelacionado"].'" target="_self">'.$row_relacionados["nome_processoRelacionado"].'</a>, '; 			
				}
				
				$contador++;
			endforeach;   
		}
	}
 
 function getMimeType($image_src)
{
	$image = base64_decode($image_src);

	$f = finfo_open();

	$mime_type = finfo_buffer($f, $image, FILEINFO_MIME_TYPE);
	 
	return $mime_type;	
}
 $bpmn='';  
 
?>
<!DOCTYPE html>
<html>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
<head>

<!-- JQuery Scripts -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- bootstrap Scripts -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>




<link rel="stylesheet" href="style.css" TYPE="text/css">
<link rel="stylesheet" href="lightbox.css" TYPE="text/css">

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

 <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css" rel="stylesheet">  

<style>
     body {
		 background: #f1eee5;
  font-family: sans-serif;
}

#myWindow {
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
}

#myContent {
  position: relative;
  display: flex;
  align-items: center;
}

#myContent img {
  display: block;
  width: auto;
  height: auto;
  margin: auto;
  align-self: center;
  flex-shrink: 0;
}

#myContent div {
  position: absolute;
  font-size: 80px;
  background: #FFFFFF;
  border-radius: 50%;
  padding: 60px;
}

.conteudo {
	margin: 5px;
	margin-bottom: 30px;
	max-width:150px;
	max-height:142px;
	border:1px solid #999;		
	font-family: sans-serif;	
	font-size: 10px;
	font-weight: bold;
	}
	
.modal {
  padding: 0 !important; // override inline padding-right added from js
}
.modal .modal-dialog {
  width: 100% !important; // override inline padding-right added from js; 
  max-width: none !important; // override inline padding-right added from js;
  height: 100% !important; // override inline padding-right added from js;
  margin:0 !important; // override inline padding-right added from js;
}
.modal .modal-content {
  height: 100% !important; // override inline padding-right added from js;
  border: 0 !important; // override inline padding-right added from js;
  border-radius: 0 !important; // override inline padding-right added from js;
}
.modal .modal-body {
  overflow-y: auto !important; // override inline padding-right added from js;
}	
	
</style>


<script src="scripts/wheel-zoom.min.js" type="text/javascript"></script>




<script type="text/javascript">

	//verificando se foi selecionado para visualizar uma imagem
            $(document).on('click','.imagem', function(){
			 var user_id	= $(this).attr("id");
			  
                
                //verificar se há valor na variavel user_id
                if( user_id != ''){
                    var dados = {
                        id: user_id
                    };
					
                    $.post('busca_imagem.php',dados, function(retorna){
                        //carregar o conteudo para o usuario;
						$("#visualizar_imagem").attr("src",retorna);					    
					    $('#VisualizarBPMN').modal('show');		
						setTimeout(function(){zoom()},200);
                    });
                }
            });
	
	
	$(function() {
			$("#BtndadosProcesso").click(function(e) {
				$('#dadosProcesso').toggle();						      
				if ($('#dadosProcesso').is(':visible'))
				{
					$("#BtndadosProcesso").html(' - ');
				}
				else
				{
					$("#BtndadosProcesso").html(' + ');
				}	
								   				
  			});
	});

	$(function() {
			$("#BtnImgProcesso").click(function(e) {
				$('#imgProcesso').toggle();
				if ($('#imgProcesso').is(':visible'))
				{
					$("#BtnImgProcesso").html(' - ');
				}
				else
				{
					$("#BtnImgProcesso").html(' + ');
				}	   				
  			});
	});
	
	
</script>

</head>
<body>
<br/> 
<div>
	<div class="col" style="font-size:13px;"><b>Voce está em:</b> <?php echo $arvore;?></div>
	<div class="border-top my-1"></div>
	<div class=" col-12 row">
	
		<div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px">
			<span style="font-family:Verdana,Geneva,sans-serif;font-size:12px;color:#000000;"><strong>DADOS DO PROCESSO</strong></span>
		</div>
	
	</div>	
	<div class="border-top my-1"></div>
	<div class=" col-12 row" id="dadosProcesso" name="dadosProcesso">
		<?php 
			echo '<div class="col-auto">&nbsp;&nbsp<label style="font-family:Verdana,Geneva,sans-serif; font-size:12px;" ><b> Processo:</label></b><span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"> &nbsp;'.$nome_processo.'</span></div>';
			echo '<div class="col-auto">&nbsp;&nbsp;<label style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"><b>Tipo:</b></label>';
		if($macro == 'S')
		{
			echo '<span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"> &nbsp;Macroprocesso </span> </div>';
		}
		else
		{
			echo '<span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"> &nbsp;Processo Simples </span> </div>';
		}
		?>
		<div class="col-auto text-right">
		<label style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"><b>Data de Publicação:</b></label> <span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"><?php echo $dataPublicacao;?></span> 
		<label style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"><b>Versão:</b></label><span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"> <?php echo $versao;?> </span></div>
		<br/><br/>
		<div class=" col-12 row">
			<?php echo '<div class="col-auto">&nbsp;&nbsp;<label style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"><b> Área Patrocinadora:</label></b><span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"> &nbsp;'.$responsavel.'</span></div>';
			      echo '<div class="col-auto">&nbsp;&nbsp;<label style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"><b>Processo Pai:</b></label><span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;"> &nbsp;'.$nome_processo_pai.'</span></div>'; 		    	  
			?>     
		</div>	
	<div class="border-top my-1"></div>
	<div class=" col-12 row">
	<?php
		
		echo '<span style="font-family:Verdana,Geneva,sans-serif; font-size:12px;color:#000000;">';
		echo $descricao;
		echo '<br/>';
		echo '<br/> </span>';
		//e macro processo
		if($macro == 'S')
		{
			echo '<div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px">';
			echo '<span style="font-family:Verdana,Geneva,sans-serif;font-size:12px;color:#000000;"><strong>PROCESSOS RELACIONADOS AO MACROPROCESSO</strong></span></div>';	
			//montar tabela com processo que são filhos do macro processo
			$sql_relacionados = "SELECT DISTINCT p.id, p.id_processo, p.nome_processo AS nome_processo, CONCAT(SUBSTRING(p.descricao,1,50),'...') AS descricao, p.versao AS versao ,
										    mp.nome_processo AS macroprocesso, s.nome AS situacao, p.situacao_id AS situacao_id,p.macro AS flag_macro
							FROM `processo` AS p LEFT JOIN portfolio_de_processos_situacao s ON s.id=p.situacao_id
												 LEFT JOIN processo  mp ON mp.id_processo=p.parent_id WHERE p.parent_id = '".$id_processo."' ORDER BY p.nome_processo ASC";
			$result_relacionados = mysqli_query($conn, $sql_relacionados);
			if ($result_relacionados)
			{
				echo '<br/>&nbsp;&nbsp;<center><table width="100%" border="1"><tr>';
				$count = 0;
				while ($select_row = mysqli_fetch_assoc($result_relacionados))
				{
					echo '<td><span style="font-family:Verdana,Geneva,sans-serif;font-size:12px;color:#000000;padding:15px;margin:0;padding-left: 0px;"><a href="Processo.php?id_processo='.$select_row["id_processo"].'" target="_self">'.$select_row["nome_processo"].'</a></span></td>';
					$count++;
					if($count == 5)
					{
						$count=0;
						echo '</tr><tr>';
					}
					
				}	
				echo '</tr></table></center>';
			}	
		}
		if($processosrelacionados!='')
		{
			echo '<br/><strong>Processos Relacionados:</strong> ';
			echo  $processosrelacionados;
		} ?>
	</div>
	<br/>
	<div class="border-top my-1"></div>
	<div class=" col-12 row">
	
		<div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px">
			<span style="font-family:Verdana,Geneva,sans-serif;font-size:12px;color:#000000;"><strong>IMAGENS</strong></span>
		</div>
	
	</div>	
	<div class="border-top my-1"></div>
	<div class="col-12 row" id="imgProcesso" name="imgProcesso" >

		<?php 
			$quantidadeImagens=0;
			// mostrando links  para as imagens cadastradas para o processo.	
			if($imagens)
			{
				foreach ($imagens as $value)
				{
				
				 $quantidadeImagens++;									 								
				}						
				$quantidadeImagens=0;
				echo '<div class="tab-content" id="imagens">';
				echo '<table border="0"> <tr>';
				$contColuna=1;
				foreach ($imagens as $value)
				{   
					
					if($contColuna < 7  && $value['img']) 
					{
						echo '<td>';
						echo '<div class="conteudo">';
						$mimeType = getMimeType($value['img']);
						echo '<center><img class="imagem" id="'.$value['id'].'" src="data:'.$mimeType.';base64,' . $value['img'] . '" / width=140px" height="140px">';
						echo $value['nome'];
						echo '</center> </div>';
						echo '</td>';
					}
					else
					{
						echo '</tr><tr>';
						$contColuna=1;
					}
					
					$quantidadeImagens++;	
					$contColuna++;
				}
				echo '</td></tr></table>'; 	
				echo '<input type="hidden" name="quant_imagens" id="quant_imagens" value="'.$quantidadeImagens.'">';
				echo '</div>';
				echo'<!-- janela visualizar imagem -->
				<div class="modal fade" data-focus="false" id="VisualizarBPMN" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
					<div class="modal-dialog" style="max-width: 60%;">
						<div class="modal-content">
							<div class="modal-header text-end">
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">                                                
								<div class="container py-3">
									<div class="row justify-content-center">
										
										<div class="d-flex my-2">
											<button data-zoom-down class="btn btn-info">Menos Zoom</button>
											<input data-zoom-range type="range" class="form-control-range mx-3"/>
											<button data-zoom-up class="btn btn-info ml-auto">Mais Zoom</button>
										</div>

										<div class="embed-responsive embed-responsive-16by9 rounded">
											<div id="myWindow" class="embed-responsive-item">
											  <div id="myContent">
													<img id="visualizar_imagem" autofocus/>
											  </div>
											</div>
										</div>
										
									</div>
								</div>												
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>							
							</div>
						</div>
					</div>
				</div>';
			}	
			if($quantidadeImagens == 0) 
			{
				echo '<center><h4 id="msg_erro_mapeamento">Nenhuma imagem cadastrada.</h4>';										 	
				echo '<img  id="bpmn" /></center>';
			}
		?>	
	</div>	
	<script type="text/javascript">
	function zoom(){

var imageElement = document.getElementById("myContent").querySelector("img");

if (imageElement.complete) {
  init();
} else {
  imageElement.onload = init;
}

function init() {
  var rangeElement = document.querySelector("[data-zoom-range]");

  var wzoom = WZoom.create("#myContent", {
    type: "html",
	minScale: null,
	maxScale: 3,
    width: imageElement.naturalWidth,
    height: imageElement.naturalHeight,
    dragScrollableOptions: {
      onGrab: function () {
        document.getElementById("myWindow").style.cursor = "grabbing";
      },
      onDrop: function () {
        document.getElementById("myWindow").style.cursor = "grab";
      }
    },
    prepare: function () {
      setTimeout(() => {
        rangeElement.min = wzoom.content.minScale;
        rangeElement.defaultValue = wzoom.content.minScale;
        rangeElement.max = wzoom.content.maxScale;
        rangeElement.step = 1 / this.speed;
      }, 0);
    },
    rescale: function () {
      rangeElement.value = wzoom.content.currentScale;
    }
  });

  document
    .querySelector("[data-zoom-up]")
    .addEventListener("click", function () {
      wzoom.zoomUp();
    });

  document
    .querySelector("[data-zoom-down]")
    .addEventListener("click", function () {
      wzoom.zoomDown();
    });

  window.addEventListener("resize", function () {
    wzoom.prepare();
  });

  rangeElement.addEventListener("input", function () {
    let newScale = Number(rangeElement.value);

    if (newScale > wzoom.content.currentScale) {
      wzoom.zoomUp();
    } else {
      wzoom.zoomDown();
    }
  });
}
}
</script>
</div>	
	
</body>
</html>

