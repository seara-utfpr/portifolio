<?php

/*
* Universidade Tecnológica Federal do Paraná 
* Escritório de Processos
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Arquivo: Visualização de dados dos Processos e montagem do Popup  
* Versão:1 Data de criação: 05/05/2021 
*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
	janela('index.php', '_parent'); // retorna para janela de login
	exit();  
  }
/* fim validacao de sessao */


 function getMimeType($image_src)
{
	$image = base64_decode($image_src);

	$f = finfo_open();

	$mime_type = finfo_buffer($f, $image, FILEINFO_MIME_TYPE);
	 
	return $mime_type;	
}

if (isset($_POST['id']))
{
  $id = $_POST['id'];
  $sql = "SELECT * FROM processo WHERE id = $id";
  $result = mysqli_query($conn, $sql);
  $row = $result->fetch_assoc();  
   
}
else
{
  $row = [];
  echo "id processo veio vazio...";
}

//Buscar dados das Imagens cadastradas para o processo
	$imagens =[];	
	// verificar se processo não é um Macroprocesso - neste caso deverá listar todas as imagens dos mapeamentos filhos 
	
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
	



//montar dados da combo para os processos PAI
//$sql_datalist_processo_pai = "SELECT * FROM `processo` WHERE situacao_id='1'";
$sql_datalist_processo_pai = "SELECT * FROM `processo`";
$datalist_values_processo_pai = '<select class="shadow-sm rounded" id="parent_id" name="parent_id" style="width: 25%">';
$datalist_values_processo_pai .= '<option></option>';
$result_datalist_processo_pai = mysqli_query($conn, $sql_datalist_processo_pai);
if ($result_datalist_processo_pai) {
while ($select_row = mysqli_fetch_assoc($result_datalist_processo_pai)) {
	$datalist_values_processo_pai .= '<option  value="'.$select_row['id_processo'].'"';
	if($select_row['id_processo']== $row['parent_id']){
						$datalist_values_processo_pai .= ' selected="selected">';
					}
					else{
						$datalist_values_processo_pai .= '>';
					}
	
	$datalist_values_processo_pai .= $select_row['nome_processo'].'</option>';
}
}else{ echo "Error: " . $sql . "<br>" . mysqli_error($conn); }
$datalist_values_processo_pai .= '</select>';

$datalist_values_tipo_macro ='<select class="shadow-sm rounded" id="tipo_macro" name="tipo_macro" style="width: 25%">';
$datalist_values_tipo_macro .= '<option></option>';
$datalist_values_tipo_macro .= '<option value="1"';
if($row['tipo_macro'] == '1'){
						$datalist_values_tipo_macro .= ' selected="selected">';
					}
					else{
						$datalist_values_tipo_macro .= '>';
					}
$datalist_values_tipo_macro .= 'Finalístico</option>';
$datalist_values_tipo_macro .= '<option value="2"';
if($row['tipo_macro'] == '2'){
						$datalist_values_tipo_macro .= ' selected="selected">';
					}
					else{
						$datalist_values_tipo_macro .= '>';
					}
$datalist_values_tipo_macro .= 'Gestão Estratégica</option>';

$datalist_values_tipo_macro .= '<option value="3"';
if($row['tipo_macro'] == '3'){
						$datalist_values_tipo_macro .= ' selected="selected">';
					}
					else{
						$datalist_values_tipo_macro .= '>';
					}
$datalist_values_tipo_macro .= 'Gestão Adminsitrativa</option>';
$datalist_values_tipo_macro .= '</select>';
?>

<div class="row">	
		<div>
			Versão: <b><?php echo $row["versao"];?></b>
	    	<br/>
			Situação: <?php switch ($row["situacao_id"]) {
						case 1:
							echo '<b> Publicado. </b>&nbsp;&nbsp;&nbsp;';
							echo 'Publicado em: <b>' .date_format(date_create($row["data_publicacao"]), 'd-m-Y H:i:s') .'</b> &nbsp;&nbsp;&nbsp;'; 
							echo 'Publicado por: <b>'. $row["atualizado_por"].'</b> &nbsp;&nbsp;&nbsp;';
						break;
						case 2:
							echo '<b> Em Edição </b>&nbsp;&nbsp;&nbsp;';
							echo 'Data de Criação: <b>' . date_format(date_create($row["data_criacao"]), 'd-m-Y H:i:s') .'</b> &nbsp;&nbsp;&nbsp;'; 
							echo 'Última Atualização em: <b>' . date_format(date_create($row["data_ultima_atualizacao"]), 'd-m-Y H:i:s').'</b> &nbsp;&nbsp;&nbsp;';
							echo 'Atualizado Por: <b>'. $row["atualizado_por"].'</b> &nbsp;&nbsp;&nbsp;';
						break;
						case 3:
							echo '<b> Revogado. </b>&nbsp;&nbsp;&nbsp;';
							echo 'Publicado em: <b>' .date_format(date_create($row["data_publicacao"]), 'd-m-Y H:i:s') .'</b> &nbsp;&nbsp;&nbsp;'; 
							echo 'Publicado por: <b>'. $row["atualizado_por"].'</b> &nbsp;&nbsp;&nbsp;';
							
						break;
						}						
			?>           
		</div>

		<div class="col-md-100 column ui-sortable card-body">				
	
			<ul class="nav nav-pills mb-1 rounded-pill" id="pills-tab" role="tablist">
				<li class="nav-item" role="presentation">
					<button class="nav-link active" id="pills-info_principal" data-bs-toggle="pill" data-bs-target="#info_principal" type="button" role="tab" aria-controls="info_principal" aria-selected="true">Informações Principais</button>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="pills-info_complementares" data-bs-toggle="pill" data-bs-target="#info_complementares" type="button" role="tab" aria-controls="info_complementares" aria-selected="false">Informações de Contato  / Internas </button>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="pills-info_publi" data-bs-toggle="pill" data-bs-target="#info_fluxo" type="button" role="tab" aria-controls="info_fluxo" aria-selected="false">Imagens</button>
				</li>			
			</ul>		
			
			<div class="tab-content border border-secondary rounded" id="pills-tabContent">
			
				<!-- Tab para Informações Principais -->
				<div class="tab-pane fade show active" id="info_principal" role="tabpanel" aria-labelledby="pills-info_principal">
				<form action="#" name="register_form" id="register_form" class="form-horizontal">		
					</br>
						<div class="col-12 form-group mb-2">
						   &nbsp;&nbsp;&nbsp; 
	                        <label><b>Nome do Processo:</b></label> 
							<input class="shadow-sm rounded" size="50" type="text" name="nome_processo" id="nome_processoInput" placeholder="Nome do Processo " value="<?php echo $row["nome_processo"]; ?>" required>
							&nbsp;&nbsp;
							<label><b>Processo Pai:</b></label>							
							<?php echo $datalist_values_processo_pai; ?>	
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<?php 
							 	if($row['macro'] == 'S')
								 {
									echo '<input class="form-check-input" type="checkbox" value="" id="flag_macro" checked>';	
								 }
								 else
								 {
									echo '<input class="form-check-input" type="checkbox" value="" id="flag_macro" >';
								 }
							?>							
  							<label> <b> Macroprocesso </b></label>
							&nbsp;&nbsp;
							<label> <b> Tipo Macroprocesso</b></label>
							<?php echo $datalist_values_tipo_macro; ?>
							
                     	</div>
						<br/>
						<div class="col-20 form-group mb-2">	
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label><b>Descritivo do Processo</b></label>
                         &nbsp;&nbsp;&nbsp;&nbsp;
						 <textarea name="descricao" id="descricao" requerided> <?php echo $row["descricao"]; ?></textarea>

						</div>
						<div class="col-20 form-group mb-2">
							&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Processos Relacionados</b></label>
							<select class="form-select" size="2" aria-label="size 3 select example">
								<?php   ?>
							</select>
						</div>	
						<br/>
						<?php if($row["situacao_id"] == '2') 
                                {
									echo '<button type="button"  title="Salvar" class="primary-btn salvar_dados"  id="'.$row["id"].'"> Salvar </button>';
									//echo '<button type="submit" name="submit" class="primary-btn"> Salvar </button>';
								}?>
				  </form>  
				</div>
				<!-- Tab para Dados complementares -->				
				<div class="tab-pane fade" id="info_complementares" role="tabpanel" aria-labelledby="info_complementares-tab">
				<form action="#" name="register_form" id="register_form" class="form-horizontal">
						</br>
						<div class="col-12 form-group mb-2">
						   &nbsp;&nbsp;
	                        <label><b>Área Patrocinadora:</b></label> 
							<input class="shadow-sm rounded" size="15" type="text" name="responsavel" id="responsavel" placeholder="Área Responsável pelo Processo " value="<?php echo $row["responsavel"]; ?>">
							&nbsp;&nbsp;
							<label><b>Solicitante:</b></label>
							<input class="shadow-sm rounded" size="15" type="text" name="solicitante" id="solicitante" placeholder="Solicitante para mapeamento do Processo" value="<?php echo $row["solicitante"]; ?>">
							&nbsp;&nbsp;
							<label><b>Telefone Contato Área:</b></label>
							<input class="shadow-sm rounded" size="10" type="text" name="telefone" id="telefone" placeholder="Telefone para contato" value="<?php echo $row["telefone"]; ?>">
							&nbsp;&nbsp;
							<label><b>E-mail:</b></label>
							<input class="shadow-sm rounded" data-inputmask="'alias': 'email'" size="15" type="text" name="email" id="email" placeholder="E-mail para contato" value="<?php echo $row["email"]; ?>">
						</div>
						<br/>
						<div class="col-20 form-group mb-2">
							&nbsp;&nbsp;
							<label><b>Nome Base de Conhecimento:</b></label>
							<input class="shadow-sm rounded" size="50" type="text" name="base_conhecimento" id="base_conhecimento" placeholder="Nome da Base de Conhecimento e do SISTEMA" value="<?php echo $row["base_conhecimento"]; ?>">							
				     	</div>
						 <br/>
						 <div class="col-20 form-group mb-2">
							&nbsp;&nbsp;
							<label><b>Pasta de Trabalho:</b></label>
							<input class="shadow-sm rounded" size="60" type="text" name="pasta_trabalho" id="pasta_trabalho" placeholder="Pasta de Trabalho Nuvem" value="<?php echo $row["pasta_trabalho"]; ?>">
							&nbsp;&nbsp;												
							<label><b>Responsável EPROC:</b></label>
							<input class="shadow-sm rounded" size="20" type="text" name="responsavel_ep" id="responsavel_ep" placeholder="Resposável pelo Processo no EPROC" value="<?php echo $row["responsavel_ep"]; ?>">
							&nbsp;&nbsp;												
						</div>
						<br/>
						<?php if($row["situacao_id"] == '1') //verifica se esta publicado o processo.
						{
						?>
							<div class="col-20 form-group mb-2">
								&nbsp;&nbsp;
								<label><b>Link acesso Direto: </b>https://processos.utfpr.edu.br/portfolio/Processo.php?id_processo=<?php echo $row["id_processo"];?></label>					
							</div>
							<br/>
						<?php
						}
						?>
						<div class="col-20 form-group mb-2">
							&nbsp;&nbsp;
							<label><b>Anotações Internas (EXCLUSIVO EPROC)</b></label>
                         	&nbsp;&nbsp;
						 	<textarea name="observacao" requerided id="observacao"> <?php echo $row["observacao"]; ?></textarea>
						</div>
						<br/>
						<?php if($row["situacao_id"] == '2') 
                                {
									echo '<button type="button"  title="Salvar" class="primary-btn salvar_dados"  id="'.$row["id"].'"> Salvar </button>';
									//echo '<button type="submit" name="submit" class="primary-btn"> Salvar </button>';
								}?>
				  	</form>
				</div>		
					
				<!-- Tab para Fluxo Mapeamento -->
				<div class="tab-pane fade" id="info_fluxo" role="tabpanel" aria-labelledby="info_publi-tab">
                    <div class="panel panel-default">												
							<div class= "border" id="lista-imagens-processo">
							
							<?php 
								if($row["situacao_id"] == "2") //verifica se o estado da versão do processo esta como "em edição"
								{ 
							?>	
									<div class="panel-heading">&nbsp;&nbsp;<b>Inserir nova Imagem</b></div>
									<form  id="formulario_imagem" name="formulario_imagem" method="POST" enctype="multipart/form-data">
										<input type="hidden" name="id_processo_insert" id="id_processo_insert" value="<?php echo $id; ?>">
										&nbsp;&nbsp;<label><b>Identificador:</b></label>
										<input class="shadow-sm rounded" size="30" type="text" name="nome_arquivo_novo" id="nome_arquivo_novo" placeholder="Informe o nome do arquivo" value="">
										&nbsp;&nbsp;<input type="file" name="bpm_file" id="bpm_file" />&nbsp;&nbsp;&nbsp;&nbsp;
										<!--<input  type="button" id="submit_image" name="submit_image" class="btn btn-outline-success submit_image" value="Inserir novo Arquivo"> -->
										<?php echo '<input type="hidden" id="situacao" name="situacao" value="'.$row["situacao_id"].'">'; ?>
										<button  type="submit" "id="submit_image" name="submit_image" class="btn btn-outline-success submit_image">Inserir novo Arquivo</button>
									</form>
							<?php } ?>	
							</div>																			        
							<div class="panel-body" id="imagem-processo">
							<div id="imagens_processo" name="imagens_processo" class="panel-heading">&nbsp;&nbsp;<b>Imagens cadastradas para o processo</b>
								<div>
									<?php 
									    $quantidadeImagens=0;
										echo '<hr><div id="alertaMapeamentoSucesso" class="alert alert-success" role="alert" style="display: none;">
									    <center>Imagem Cadastrada/Atualizada com sucesso.</center></div>';
									   	$quantidadeImagens=0;
										// mostrando links  para as imagens cadastradas para o processo.	
										if($imagens)
										{
											$quantidadeImagens=0;
											echo '<div class="tab-content" id="imagens">';
											echo '<table border="0"> <tr>';
											$contColuna=1;
											
											foreach ($imagens as $value)
											{   
												
												if($contColuna <= 7  && $value['img']) 
												{
													
													echo '<td>';
													echo '<div class="conteudo">';
													$mimeType = getMimeType($value['img']);
													echo '<center>';
													echo '<img class="imagem" alt="'.$value['nome'].'" id="'.$value['id'].'" src="data:'.$mimeType.';base64,' . $value['img'] . '" / width=140px" height="140px">';													
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
											
											echo'<!-- janela visualizar imagem -->
											<div class="modal fade" data-focus="false" id="VisualizarBPMN" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
												<div class="modal-dialog modal-xl" style="max-width: 80%;">
													<div class="modal-content">
														<div class="modal-header text-end">';
														if($row["situacao_id"] == "2") //verifica se o estado da versão do processo esta como "em edição"
															{	
																echo '<form id="alterar_imagem" name="alterar_imagem" enctype="multipart/form-data">
																		<label><b>Identificador:</b></label>
																		<input class="shadow-sm rounded" size="30" type="text" name="nome_arquivo" id="nome_arquivo" placeholder="Informe o nome do arquivo" value="">																		
																		&nbsp;&nbsp;<label><b>Arquivo:</b></label>
																		<input type="file" name="bpm_alt_file" id="bpm_alt_file" />
																		<br/>
																		<input type="hidden" id="id_imagem" name="id_imagem">
																		<input type="hidden" id="situacao" name="situacao" value="'.$row["situacao_id"].'">
																		<input  type="button" onclick="altera_id_imagem('.$value['id'].')" id="submit_alt_image" name="submit_alt_image" class="btn btn-outline-success submit_alt_image" value="Alterar Imagem">
																		<input  type="button" onclick="altera_id_imagem('.$value['id'].')" id="delete_image" name="delete_image" class="btn btn-outline-danger delete_image" value="Apagar Imagem">
																	</form>';		
															}
														echo '<button type="button" class="btn-close" onclick="$(\'#VisualizarBPMN\').modal(\'hide\');" aria-label="Close"></button>
														</div>
														<div class="modal-body">																
															<div class="container py-4">
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
															<button type="button" class="btn btn-secondary" onclick="$(\'#VisualizarBPMN\').modal(\'hide\');">Fechar</button>							
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
										echo '<input type="hidden" name="quant_imagens" id="quant_imagens" value="'.$quantidadeImagens.'">';
										if($quantidadeImagens == 0) 
										{
											echo '<center><h5 id="msg_erro_mapeamento">Nenhum Mapeamento cadastrado.</h5>';										 	
											echo '<img  id="bpmn" /></center>';
										}
										?>									
								</div>								
                            </div> 
							</div>
                    </div>
                </div>
			</div>		
	</div>	
</div>
<div id="ConfirmDeleteImagem" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" style="max-width: 50%;">
                <div class="modal-content">
                        <div class="modal-header text-end">
                            <center><h5 class="modal-title" id="staticBackdropLabel">Excluir Imagem</h5></center>
                        </div>
                        <div class="modal-body" align="center">
                            <strong>
                                  Tem certeza que deseja excluir a Imagem?
                                  <br/>
                                  Esta ação não poderá ser desfeita.
                            </strong>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary" id="deleteImg">Confirmar</button>
                            <button type="button" data-dismiss="modal" class="btn btn-secondary" id="cancela_excluir" >Cancelar</button>                            
                        </div>
                </div>  
            </div>
        </div>
<script>

function altera_id_imagem(id_img) {	
  document.getElementById("id_imagem").value = id_img;
}

$(document).ready( function () {


	  $('.modal').on("hidden.bs.modal", function (e) { //fire on closing modal box
        if ($('.modal:visible').length) { // check whether parent modal is opend after child modal close
            $('body').addClass('modal-open'); // if open mean length is 1 then add a bootstrap css class to body of the page
        }
    });
	
	//CKEDITOR
	CKEDITOR.replace('descricao');
	CKEDITOR.replace('observacao');


	//verificando se foi acionado botao para salvar os dados do processo
	$(document).on('click','.salvar_dados', function(){

		var user_id	= $(this).attr("id");
		//buscando dados para salvar
		var macro;

		if($('#flag_macro').is(':checked') ==true)
		{
			macro = 'S';
		}
		else
		{
			macro = 'N';
		}
		
		var nome_processo = $("#nome_processoInput").val();
		var tipo_macro = $("#tipo_macro").val();
		var parent_id = $("#parent_id").val();
		var descricao = CKEDITOR.instances.descricao.getData();
		var responsavel = $("#responsavel").val();
		var solicitante = $("#solicitante").val();
		var telefone = $("#telefone").val();
		var email = $("#email").val();
		var base_conhecimento = $("#base_conhecimento").val();
		var pasta_trabalho = $("#pasta_trabalho").val();
		var responsavel_ep = $("#responsavel_ep").val();
		var observacao = CKEDITOR.instances.observacao.getData();

		
		if( user_id != '')
		{
			var dados = {
				id: user_id,
				nome_processo: nome_processo,
				parent_id: parent_id,
				descricao: descricao,
				responsavel: responsavel,
				solicitante: solicitante,
				telefone: telefone,
				email: email,
				base_conhecimento: base_conhecimento,
				pasta_trabalho: pasta_trabalho,
				responsavel_ep: responsavel_ep,
				observacao: observacao,
				macro: macro,
				tipo_macro: tipo_macro
			};
			//console.log(dados);
			$.post('includes/dbh.insert_process.php',dados,function(retorna){
				$('#EditProcessoModal').modal('hide');										
					$('#UpdateOk').fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
					table.destroy();
					SetDataTable();                          
				}); 
		}
	});	
  
	//verificando se foi selecionado para visualizar imagem do mapeamento
	$(document).on('click','.mostra_imagem', function(){
        var i;        
		var nome_div;
		var quant_imagens = $("#quant_imagens").val();
		//fechando as divs para troca de imagem a ser mostrada.
		for(i=1; i <= quant_imagens; i++)
		{
			nome_div = "#mapeamento_"+i;
			$(nome_div).hide();				             	
		}
		var img_id	= $(this).attr("id");	
		img_id = img_id.substring(4);
		var nome_div = "#mapeamento_" + img_id;
		$(nome_div).show();				             
    });
	
	//verificando se foi selecionado para inserir novo arquivo de mapeamento para o processo
	$("#formulario_imagem").submit(function(event){
		
		var formData = new FormData();
		var nome = $("#nome_arquivo_novo").val();
		var arquivo = $('#bpm_file')[0].files;
		var situacao = document.getElementById("situacao").value;
		formData.append('bpm_file',arquivo[0]);
		formData.append('id_processo', $("#id_processo_insert").val());		
		formData.append('nome_arquivo', nome);
		formData.append('situacao', situacao);
		setTimeout(function () {
			$.ajax({
						type: "POST",
						url: "includes/dbh.insert_image.php",
						data: formData,
						contentType: false, 
						processData: false,     					      					
						success: function(response){
								//retorno OK do Upload....         
								nome = "";
								arquivo = "";							
								$('#alertaMapeamentoSucesso').show();
								setTimeout(function () {
										$('#alertaMapeamentoSucesso').hide(); // "alertaMapeamentoSucesso" é o id do elemento que seja manipular.
								}, 4000);
								$(imagens_processo).html(response);
						},	
		})},500);		
		event.preventDefault();
	});

    //verificando se foi selecionado para alterar arquivo de mapeamento para o processo
	$(document).on('click','.submit_alt_image', function(event){

		var formData = new FormData();
		var id_imagem = document.getElementById("id_imagem").value;
		var nome = $("#nome_arquivo").val();
		var situacao = document.getElementById("situacao").value;
		var arquivo = $('#bpm_alt_file')[0].files;
		
		
		formData.append('bpm_file',arquivo[0]);
		formData.append('id_imagem', id_imagem);		
		formData.append('nome_arquivo', nome);
		formData.append('id_processo', $("#id_processo_insert").val());	
		formData.append('situacao', situacao);
		
		setTimeout(function () {
		$.ajax({
    				type: "POST",
      				url: "includes/dbh.update_image.php",
					data: formData,
					contentType: false, 
					processData: false,     					      					
					success: function(response){
								//retorno OK do Upload....
                    		$('#VisualizarBPMN').modal('hide');									
							$(imagens_processo).html(response);                              
					},	
		})},300);
		event.preventDefault();
	});
	
	//verificando se foi selecionado para excluir  arquivo de mapeamento para o processo
	$(document).on('click','.delete_image', function(event){
		
		
		$('#ConfirmDeleteImagem').modal('show')
            .on('click', '#cancela_excluir', function(e){
				$('#ConfirmDeleteImagem').modal('hide');
			});		
		
		$('#ConfirmDeleteImagem').modal('show')
            .on('click', '#deleteImg', function(e){
		
				var formData = new FormData();
				var id_imagem = document.getElementById("id_imagem").value;
				var situacao = document.getElementById("situacao").value;
				formData.append('id_processo', $("#id_processo_insert").val());	
				formData.append('id_imagem', id_imagem);
				formData.append('situacao', situacao);
				$.ajax({
							type: "POST",
							url: "includes/dbh.delete_image.php",
							data: formData,
							contentType: false, 
							processData: false,     					      					
							success: function(response){

									//retorno OK do delete....          						            
									$('#ConfirmDeleteImagem').modal('hide');
									$('#VisualizarBPMN').modal('hide');									
									$(imagens_processo).html(response);
							},	
				});
			event.preventDefault();
		});
	});	

    $("#telefone").mask("(00) 0000-0000");
	
	$("#macro_id").select2({
			placeholder: "Selecione o macroprocesso para este Processo.",
			allowClear: true
	});					
	$("#area_id").select2({
			placeholder: "Selecione a Área para este Processo.",
			allowClear: true
	});	
	$("#subarea_id").select2({
			placeholder: "Selecione a Sub-Área para este Processo, quando houver.",
			allowClear: true
	});		
	$("#parent_id").select2({
			placeholder: "Selecione o processo Pai deste Processo, quando houver.",
			allowClear: true
	});	
	$("#tipo_macro").select2({
			placeholder: "Selecione tipo do macroproceso, quando houver.",
			allowClear: true
	});	
});              
</script> 