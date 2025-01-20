<meta charset="UTF-8">
<?php
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);

        include_once 'dbh.php';

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
        $id_processo = $_POST['id_processo'];
        $nome_arquivo = $_POST['nome_arquivo'];
        $bpm = $_FILES['bpm_file']['tmp_name'];    
		$situacao = $_POST['situacao'];		

        $bpm = base64_encode(file_get_contents(addslashes($bpm)));

        $data_ultima_atualizacao = date_create()->format('Y-m-d H:i:s');

        $sql = "INSERT INTO imagem_processo(`nome`,`img`,`id_processo`) values ('$nome_arquivo','$bpm','$id_processo')";
        
      
        if (mysqli_query($conn, $sql))
		{

            //atualizando a página para incluir nova imagem  que foi cadastrada.
            $imagens =[];
            $sql_imagens = "SELECT * FROM imagem_processo WHERE id_processo=$id_processo";
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
				$quantidadeImagens++;									 								
			 }							
			 $quantidadeImagens=0; ?>
			
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
											echo '</td></tr></table>'; 	
											echo '<input type="hidden" name="quant_imagens" id="quant_imagens" value="'.$quantidadeImagens.'">';
											echo '</div>';
											
											echo'<!-- janela visualizar imagem -->
											<head>
												<meta charset="UTF-8">
											</head>
											<div class="modal fade" data-focus="false" id="VisualizarBPMN" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
												<div class="modal-dialog modal-xl" style="max-width: 80%;">
													<div class="modal-content">
														<div class="modal-header text-end">';
														if($situacao == "2") //verifica se o estado da versão do processo esta como "em edição"
															{	
																echo '<form id="alterar_imagem" name="alterar_imagem" enctype="multipart/form-data">
																		<label><b>Identificador:</b></label>
																		<input class="shadow-sm rounded" size="30" type="text" name="nome_arquivo" id="nome_arquivo" placeholder="Informe o nome do arquivo" value="">
																		<br/>
																		&nbsp;&nbsp;<label><b>Arquivo:</b></label>
																		<input type="file" name="bpm_alt_file" id="bpm_alt_file" />
																		<br/>
																		<input  type="button" onclick="altera_id_imagem('.$value['id'].')" id="submit_alt_image" name="submit_alt_image" class="btn btn-outline-success submit_alt_image" value="Alterar Imagem">
																		<input  type="button" onclick="altera_id_imagem('.$value['id'].')" id="delete_image" name="delete_image" class="btn btn-outline-danger delete_image" value="Apagar Imagem">
																		<input type="hidden" id="id_imagem" name="id_imagem">
																		<input type="hidden" id="situacao" name="situacao" value="'.$situacao.'">
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
										echo '<div id="ConfirmDeleteImagem" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
											</div>';			
										}	
										if($quantidadeImagens == 0) 
										{
											echo '<center><h4 id="msg_erro_mapeamento">Nenhuma imagem cadastrada.</h4>';										 	
											echo '<img  id="bpmn" /></center>';
										}										
										if($quantidadeImagens == 0) 
										{
											echo '<center><h5 id="msg_erro_mapeamento">Nenhum Mapeamento cadastrado.</h5>';										 	
											echo '<img  id="bpmn" /></center>';
										}
										?>									
								</div>								
            </div> 				
			<?php echo '<input type="hidden" name="quant_imagens" id="quant_imagens" value="'.$quantidadeImagens.'">';
        }
        else
		{
                //deve ser inserido nova linha para essa imagem.

                echo "alert('Error Impossível achar Processo para inserir a imagem')";
                echo $sql;
        }
        mysqli_close($conn);
?>