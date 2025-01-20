<?php
/*
* Universidade Tecnológica Federal do Paraná 
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Arquivo: Montagem e Visualização dos Processos
* Versão:1 Data de criação: 01/05/2021 
* Última Alteração em: 26/04/2022
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

//montando dados para pesquisa de macroprocesso
$sql_datalist_macro = "SELECT DISTINCT p1.id_processo, p1.nome_processo FROM `processo` AS p1 INNER JOIN processo AS p2 ON p2.parent_id = p1.id_processo ORDER BY nome_processo ASC";
$datalist_values_macro = '<select class="shadow-sm rounded" id="macro" name="macro" style="width: 25%">';
$datalist_values_macro .= '<option></option>';
$result_datalist_macro = mysqli_query($conn, $sql_datalist_macro);
if ($result_datalist_macro) {
	while ($select_row = mysqli_fetch_assoc($result_datalist_macro)) {
		$datalist_values_macro .= '<option  value="'.$select_row['id_processo'].'">';
		$datalist_values_macro .= $select_row['nome_processo'].'</option>';
	}
}else{ echo "Error: " . $sql . "<br>" . mysqli_error($conn); }
$datalist_values_macro .= '</select>';

//montando dados para pesquisa de situação
$sql_datalist_situacao = "SELECT * FROM `portfolio_de_processos_situacao`";
$datalist_values_situacao = '<select class="shadow-sm rounded" id="situacao_id" name="situacao_id" style="width: 10%">';
$datalist_values_situacao .= '<option value="">Todos</option>';
$result_datalist_situacao = mysqli_query($conn, $sql_datalist_situacao);
if ($result_datalist_situacao) {
	while ($select_row = mysqli_fetch_assoc($result_datalist_situacao)) {
		$datalist_values_situacao .= '<option  value="'.$select_row['id'].'">';
		$datalist_values_situacao .= $select_row['nome'].'</option>';
	}
}else{ echo "Error: " . $sql . "<br>" . mysqli_error($conn); }
$datalist_values_situacao .= '</select>';

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
      <title>Portfolio de processos </title>


	<!-- JQuery Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.11/jquery.mask.min.js"></script>

    <!-- DataTable Scripts    -->
    <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.bootstrap4.min.js"></script>
	<script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.print.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.colVis.min.js"></script>

    <!-- Ajax Scripts    -->
    <script type="text/javascript" charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script type="text/javascript" charset="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    
    <!-- Autocomplete Scripts -->
    <script type="text/javascript" charset="UTF-8" src="https://cdn.jsdelivr.net/gh/xcash/bootstrap-autocomplete@v2.3.7/dist/latest/bootstrap-autocomplete.min.js"></script>

	<!-- bootstrap Scripts -->
	<script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap5.min.js "></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

    <!-- CKEditor Scripts -->
    <script src="scripts/ckeditor/ckeditor.js"></script>    
    <!-- <script src="https://cdn.ckeditor.com/4.16.2/full-all/ckeditor.js"></script> -->
    <!-- <script src="https://cdn.ckeditor.com/ckeditor5/29.1.0/decoupled-document/ckeditor.js"></script> -->
	
	<!-- Select2 Scripts -->
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	

	<!-- Mask Scripts -->
	<script type='text/javascript' src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>


    <!--Links para Estilos-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
	<!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css"> -->
    <!--<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css"> -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.bootstrap4.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap5.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />	
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
	<link rel="stylesheet" href="./style.css">
	<link rel="stylesheet" href="preview/lightbox.css" TYPE="text/css">
<style>
body {		 
  font-family: sans-serif;
  font-size: 12px;
}

p{
		font-weight: bold;
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

<script src="preview/scripts/wheel-zoom.min.js" type="text/javascript"></script>

<script>
var table;
//funcao para setar os atributos da tabela DataTable.
function SetDataTable()
{
    var NomeProcesso = document.getElementById('nome_processo1').value;
    var situacao_id = document.getElementById('situacao_id').value;
    var macro_id = $("#macro").val();			
	

    table = $('#Processos').DataTable( {                       
                            "language": {
                            "emptyTable": "Nenhum registro encontrado",
                            "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                            "infoEmpty": "Mostrando 0 até 0 de 0 registros",
                            "infoFiltered": "(Filtrados de _MAX_ registros)",
                            "infoThousands": ".",
                            "loadingRecords": "Carregando...",
                            "processing": "Processando...",
                            "zeroRecords": "Nenhum registro encontrado",
                            "search": "Pesquisar",
                            "paginate": {
                                "next": "Próximo",
                                "previous": "Anterior",
                                "first": "Primeiro",
                                "last": "Último"
                            },
                            "aria": {
                                "sortAscending": ": Ordenar colunas de forma ascendente",
                                "sortDescending": ": Ordenar colunas de forma descendente"
                            },
                            "select": {
                                "rows": {
                                    "_": "Selecionado %d linhas",
                                    "0": "Nenhuma linha selecionada",
                                    "1": "Selecionado 1 linha"
                                },
                                "1": "%d linha selecionada",
                                "_": "%d linhas selecionadas",
                                "cells": {
                                    "1": "1 célula selecionada",
                                    "_": "%d células selecionadas"
                                },
                                "columns": {
                                    "1": "1 coluna selecionada",
                                    "_": "%d colunas selecionadas"
                                }
                            },
                            "buttons": {
                                "copySuccess": {
                                    "1": "Uma linha copiada com sucesso",
                                    "_": "%d linhas copiadas com sucesso"
                                },
                                "collection": "Coleção  <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                                "colvis": "Visibilidade da Coluna",
                                "colvisRestore": "Restaurar Visibilidade",
                                "copy": "Copiar",
                                "copyKeys": "Pressione ctrl ou u2318 + C para copiar os dados da tabela para a área de transferência do sistema. Para cancelar, clique nesta mensagem ou pressione Esc..",
                                "copyTitle": "Copiar para a Área de Transferência",
                                "csv": "CSV",
                                "excel": "Excel",
                                "pageLength": {
                                    "-1": "Mostrar todos os registros",
                                    "1": "Mostrar 1 registro",
                                    "_": "Mostrar %d registros"
                                },
                                "pdf": "PDF",
                                "print": "Imprimir"
                            },
                            "autoFill": {
                                "cancel": "Cancelar",
                                "fill": "Preencher todas as células com",
                                "fillHorizontal": "Preencher células horizontalmente",
                                "fillVertical": "Preencher células verticalmente"
                            },
                            "lengthMenu": "Exibir _MENU_ resultados por página",
                            "searchBuilder": {
                                "add": "Adicionar Condição",
                                "button": {
                                    "0": "Construtor de Pesquisa",
                                    "_": "Construtor de Pesquisa (%d)"
                                },
                                "clearAll": "Limpar Tudo",
                                "condition": "Condição",
                                "conditions": {
                                    "date": {
                                        "after": "Depois",
                                        "before": "Antes",
                                        "between": "Entre",
                                        "empty": "Vazio",
                                        "equals": "Igual",
                                        "not": "Não",
                                        "notBetween": "Não Entre",
                                        "notEmpty": "Não Vazio"
                                    },
                                    "number": {
                                        "between": "Entre",
                                        "empty": "Vazio",
                                        "equals": "Igual",
                                        "gt": "Maior Que",
                                        "gte": "Maior ou Igual a",
                                        "lt": "Menor Que",
                                        "lte": "Menor ou Igual a",
                                        "not": "Não",
                                        "notBetween": "Não Entre",
                                        "notEmpty": "Não Vazio"
                                    },
                                    "string": {
                                        "contains": "Contém",
                                        "empty": "Vazio",
                                        "endsWith": "Termina Com",
                                        "equals": "Igual",
                                        "not": "Não",
                                        "notEmpty": "Não Vazio",
                                        "startsWith": "Começa Com"
                                    },
                                    "array": {
                                        "contains": "Contém",
                                        "empty": "Vazio",
                                        "equals": "Igual à",
                                        "not": "Não",
                                        "notEmpty": "Não vazio",
                                        "without": "Não possui"
                                    }
                                },
                                "data": "Data",
                                "deleteTitle": "Excluir regra de filtragem",
                                "logicAnd": "E",
                                "logicOr": "Ou",
                                "title": {
                                    "0": "Construtor de Pesquisa",
                                    "_": "Construtor de Pesquisa (%d)"
                                },
                                "value": "Valor"
                            },
                            "searchPanes": {
                                "clearMessage": "Limpar Tudo",
                                "collapse": {
                                    "0": "Painéis de Pesquisa",
                                    "_": "Painéis de Pesquisa (%d)"
                                },
                                "count": "{total}",
                                "countFiltered": "{shown} ({total})",
                                "emptyPanes": "Nenhum Painel de Pesquisa",
                                "loadMessage": "Carregando Painéis de Pesquisa...",
                                "title": "Filtros Ativos"
                            },
                            "searchPlaceholder": "Digite um termo para pesquisar",
                            "thousands": ".",
                            "datetime": {
                                "previous": "Anterior",
                                "next": "Próximo",
                                "hours": "Hora",
                                "minutes": "Minuto",
                                "seconds": "Segundo",
                                "amPm": [
                                    "am",
                                    "pm"
                                ],
                                "unknown": "-"
                            },
                            "editor": {
                                "close": "Fechar",
                                "create": {
                                    "button": "Novo",
                                    "submit": "Criar",
                                    "title": "Criar novo registro"
                                },
                                "edit": {
                                    "button": "Editar",
                                    "submit": "Atualizar",
                                    "title": "Editar registro"
                                },
                                "error": {
                                    "system": "Ocorreu um erro no sistema (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Mais informações<\/a>)."
                                },
                                "multi": {
                                    "noMulti": "Essa entrada pode ser editada individualmente, mas não como parte do grupo",
                                    "restore": "Desfazer alterações",
                                    "title": "Multiplos valores",
                                    "info": "Os itens selecionados contêm valores diferentes para esta entrada. Para editar e definir todos os itens para esta entrada com o mesmo valor, clique ou toque aqui, caso contrário, eles manterão seus valores individuais."
                                },
                                "remove": {
                                    "button": "Remover",
                                    "confirm": {
                                        "_": "Tem certeza que quer deletar %d linhas?",
                                        "1": "Tem certeza que quer deletar 1 linha?"
                                    },
                                    "submit": "Remover",
                                    "title": "Remover registro"
                                }
                            },
                            "decimal": ","
                        },
             "lengthChange": true,
             "searching": false,    
             "processing": true,
             "serverSide": false,
			 "scrollY": "300px",
			 "scrollX": true,
             "scrollCollapse": true,
			 
             "ajax": {
                        "url": "includes/busca_processos.php",
                        "type":"POST",
                        "data":  function ( d )
                                 {
                                    d.NomeProcesso = NomeProcesso;
                                    d.macro_id = macro_id;
                                    d.situacao_id = situacao_id;
                                 }
                    }
}); 
new $.fn.dataTable.Buttons( table, { buttons: ['copy', 'excel', 'pdf','colvis' ]} );    
table.buttons().container()
               .appendTo( '#Processos_wrapper .col-md-6:eq(0)' );
}

//funcao principal    

$(document).ready( function () {
	
			//verificando se foi selecionado para visualizar uma imagem
            $(document).on('click','.imagem', function(){
			 var user_id	   = $(this).attr("id");			 
			 var nome_imagem   = $(this).attr("alt");				 
			 var alt_imagem ="altera_id_imagem('" + user_id + "')";
			    //verificar se há valor na variavel user_id
                if( user_id != ''){
                    var dados = {
                        id: user_id
                    };
			        $.post('preview/busca_imagem.php',dados, function(retorna){
                        //carregar o conteudo para o usuario;
						$("#visualizar_imagem").attr("src",retorna);
						$("#submit_alt_image").attr("onclick",alt_imagem);
						$("#delete_image").attr("onclick",alt_imagem);
						$("#nome_arquivo").attr("value",nome_imagem);							
						//name="nome_arquivo_'.$value['id'].'" id="nome_arquivo_'.$value['id'].		
					    $('#VisualizarBPMN').modal('show');		
						setTimeout(function(){zoom()},200);
                    });
                }
	        });	
			
			$(document).on('show.bs.modal', '.modal', function (event) {
				
				var zIndex = 1040 + (10 * $('.modal:visible').length);
				$(this).css('z-index', zIndex);
				setTimeout(function() {
					$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
				},0);
			});
			
            $('#alertaMapeamentoSucesso').hide();

            SetDataTable();

            //verificando se uma nova pesquisa foi acionada.    
            $(document).on('click','.search_data', function(){ 
                
                table.destroy();               
                
                SetDataTable();                
            });

            //verificando se foi selecionado para visualizar um processo
            $(document).on('click','.view_data', function(){
                var user_id	= $(this).attr("id");
                
                //verificar se há valor na variavel user_id
                if( user_id != ''){
                    var dados = {
                        id: user_id
                    };
                    $.post('process_view.php',dados, function(retorna){
                        //carregar o conteudo para o usuario;
                        $("#edit_processo").html(retorna);
                        $('#EditProcessoModal').modal('show');										
                    });
                }
            });

            //verificando se foi selecionado para criar um processo
            $(document).on('click','.add_data', function(){
                
                $.post('includes/dbh.create_process.php',"", function(user_id){
                        //carregar o conteudo para o usuario;
                        var dados = {
                            id: user_id
                        };
                        
                        $.post('process_view.php',dados, function(retorna){
                            //carregar o conteudo para o usuario;
                             $("#edit_processo").html(retorna);
                             $('#EditProcessoModal').modal('show');					
                        });                                          					
                 });
                 
            });

            //verificando se foi selecionado para criar uma nova versao para um processo
            $(document).on('click','.new_version', function(){

                var user_id	= $(this).attr("id");
                if( user_id != '')
                {
                    var dados = {
                        id: user_id
                    };
                    $.post('includes/dbh.cloneProcess.php',dados, function(retorna){
                        //carregar o conteudo para o usuario;
                        var dados = {
                        id: retorna
                         };
                        $.post('process_view.php',dados, function(retorna){
                            //carregar o conteudo para o usuario;
                             $("#edit_processo").html(retorna);
                             $('#EditProcessoModal').modal('show');					
                        });
                    });
                }
            });			

            //verificando se foi selecionado para excluir um processo.
            $(document).on('click','.delete_data', function(e) {
                var user_id	= $(this).attr("id");
                var dados = { id: user_id };
                $('#ConfirmDelete').modal('show')
                .on('click', '#delete', function(e){
                    $.post('includes/dbh.deleteProcess.php',dados, function(retorna){

                        $('#ConfirmDelete').modal('hide');
                        $('#DeleteOk').fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
                        table.destroy();
                        SetDataTable();                          
                    });
                });                
            });

            //verificando se foi selecionado para publicar um processo.
            $(document).on('click','.publicar_data', function(e) {
                var user_id	= $(this).attr("id");
                var dados = { id: user_id };
                $('#ConfirmPublicar').modal('show')
                .on('click', '#publicar', function(e){
                    $.post('includes/dbh.PublishProcess.php',dados, function(retorna){

                        $('#ConfirmPublicar').modal('hide');
                        $('#PublicarOk').fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
                        table.destroy();
                        SetDataTable();
                        
                    });
                });                
            });

            $.fn.modal.Constructor.prototype._enforceFocus = function(){};

        });		       
    </script>
</head>

<body>
       <div class="main-content">
       
                <label class="inline title">Processos de Negócio</label>
                <br/>
                <br/>
            <div id="pesquisa" class="border border-2">   
            &nbsp;&nbsp;<label class="title">Filtro</label>
                <form action="#" name="register_form1" id="register_form1" class="form-horizontal">
                    <div class="col-12 form-group mb-2">
						    &nbsp;&nbsp;&nbsp;&nbsp; 
	                        <label><b>Nome do Processo:</b></label> 
							<input class="shadow-sm rounded" size="30" type="text" name="nome_processo1" id="nome_processo1" placeholder="Nome do Processo">
                            &nbsp;&nbsp;&nbsp;&nbsp;         
							<label><b>Processo Pai:</b></label>
							<?php echo $datalist_values_macro; ?>
                            &nbsp;&nbsp;&nbsp;&nbsp;         
							<label><b>Situação:</b></label>
                            <?php echo $datalist_values_situacao; ?>
                            &nbsp;&nbsp;<button type="button" class="btn btn-outline-primary search_data"  id="Btn_Pesquisar">Filtrar</button>							    
					</div>
                </form>        
        	</div>
            <br/>
            <div id="resultado">
           
            <div class="sticky-top alert alert-dismissible alert-success hide" name="DeleteOk" id="DeleteOk" style="display: none;"><center>Processo Excluído com Sucesso!!</center></div>
            <div class="sticky-top alert alert-dismissible alert-success hide" name="UpdateOk" id="UpdateOk" style="display: none;"><center>Processo Atualizado com Sucesso!!</center></div>
            <div class="sticky-top alert alert-dismissible alert-success hide" name="PublicarOk"  id="PublicarOk" style="display: none;"><center>Processo Publicado com Sucesso!!</center></div>
            <button type="button" class="btn btn-outline-success add_data"  id="Btn_Cadastrar">Cadastrar novo Processo</button>
                <!--table id="Processos" class="table table-striped table-bordered" style="width:100%"> -->
                <table id="Processos" class="table table-striped table-bordered dt-responsive nowrap" style="width:81%">
                    <thead>
                        <th> Nome </th>						
						<th> Descrição Resumida </th>
						<th> Processo Pai</th>
                        <th> Versão </th>
                        <th> É Macroprocesso? </th>
						<th> Situação </th>
						<th> Ação </th>
                    </thead>
                </table>				
            </div>
        </div>                                            
        <!-- janela alterar -->
        <div class="modal fade" data-focus="false" id="EditProcessoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
                <div class="modal-dialog modal-xl" style="max-width: 80%;">
                    <div class="modal-content">
                        <div class="modal-header text-end">
                            <h5 class="modal-title" id="staticBackdropLabel">Editor Processo </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">                                                
                            <p id="edit_processo"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>							
                        </div>
                    </div>
                </div>
        </div>

        <div id="ConfirmDelete" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" style="max-width: 50%;">
                <div class="modal-content">
                        <div class="modal-header text-end">
                            <center><h5 class="modal-title" id="staticBackdropLabel">Excluir Processo</h5></center>
                        </div>
                        <div class="modal-body" align="center">
                            <strong>
                                  Tem certeza que deseja excluir o Processo?
                                  <br/>
                                  Esta ação não poderá ser desfeita.
                            </strong>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary" id="delete">Confirmar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>                            
                        </div>
                </div>  
            </div>
        </div>

        <div id="ConfirmPublicar" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" style="max-width: 50%;">
                <div class="modal-content">
                        <div class="modal-header text-end">
                            <center><h5 class="modal-title" id="staticBackdropLabel">Publicar Processo</h5></center>
                        </div>
                        <div class="modal-body" align="center">
                            <strong>
                                  Tem certeza que deseja Publicar o Processo?
                                    <br/>
                                    Esta ação não poderá ser desfeita.
                            </strong>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary" id="publicar">Confirmar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>                            
                        </div>
                </div>  
            </div>
        </div>           
        
</div>       
</body>
<script>

	function zoom(){

		var imageElement = document.getElementById("myContent").querySelector("img");
		if (imageElement.complete) {
		  init(imageElement);
		} else {
		  imageElement.onload = init;
		}
	}
	
function init(imageElement) {
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
</script>
</html>