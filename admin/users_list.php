<?php
/*
* Universidade Tecnológica Federal do Paraná 
* Sistema: Gerenciador de Porfólio de Processos
* Desenvolvido por: Ricardo Ponestke Seara
* Arquivo: Montagem e Visualização dos usuarios cadastrados para usar o sistema
* Versão:1 Data de criação: 07/06/2021 
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
    
  }
  else
  {
    //retorna ao menu de login.
    Unset($_SESSION['portfolio']); // encerra a sessao.
    janela('index.php', '_parent'); // retorna para janela de login
    exit();  
  }
/* fim validacao de sessao */


?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./style.css">
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
    
 

	<!-- bootstrap Scripts -->
	<script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap5.min.js "></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

    <!-- CKEditor Scripts -->
    <script src="https://cdn.ckeditor.com/ckeditor5/23.1.0/classic/ckeditor.js"></script>
	
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

    <script>
var table;
//funcao para setar os atributos da tabela DataTable.
function SetDataTable()
{
    var NomeUsuario = document.getElementById('nome_usuario').value;
    var login_user = document.getElementById('login_user').value;


    table = $('#Usuarios').DataTable( {                       
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
             "ajax": {
                        "url": "includes/busca_usuarios.php",
                        "type":"POST",
                        "data":  function ( d )
                                 {
                                    d.NomeUsuario = NomeUsuario;
                                    d.login_user = login_user;                                    
                                 }
                    }
}); 
new $.fn.dataTable.Buttons( table, { buttons: ['copy', 'excel', 'pdf','colvis' ]} );    
table.buttons().container()
               .appendTo( '#Usuarios_wrapper .col-md-6:eq(0)' );
}

//funcao principal        
$(document).ready( function () {
            $('#alertaMapeamentoSucesso').hide();

            SetDataTable();

            //verificando se uma nova pesquisa foi acionada.    
            $(document).on('click','.search_user', function(){ 
                
                table.destroy();               
                
                SetDataTable();                
            });

            //verificando se foi selecionado para visualizar um processo
            $(document).on('click','.view_user', function(){
                var user_id	= $(this).attr("id");
                
                //verificar se há valor na variavel user_id
                if( user_id != ''){
                    var dados = {
                        id: user_id
                    };
                    $.post('user_view.php',dados, function(retorna){
                        //carregar o conteudo para o usuario;
                        $("#edit_usuario").html(retorna);
                        $('#EditUserModal').modal('show');										
                    });
                }
            });

            //verificando se foi selecionado para criar um usuário
            $(document).on('click','.add_user', function(){

    /*            $.post('process_view.php',dados, function(retorna){
                    //carregar o conteudo para o usuario;
                    $("#edit_processo").html(retorna);
                    $('#EditProcessoModal').modal('show');					
                }); 

    			$.post('includes/dbh.add_user.php',"", function(retorna){
					//carregar o conteudo para o usuario;
					$("#edit_usuario").html(retorna);
					$('#AddMacroProcessoModal').modal('show');
					$(".adicionar").select2({
						dropdownParent: $('#AddMacroProcessoModal'),
						placeholder: "Selecione o macroprocesso Pai quando houver2.",
						allowClear: true
					});
				});*/
                alert('TODO: Adicionar novo usuario ao sistema....');
		});                      				

            //verificando se foi selecionado para desabilitar um usuário.
            $(document).on('click','.delete_user', function(e) {
                var user_id	= $(this).attr("id");
                var dados = { id: user_id };
                $('#ConfirmDelete').modal('show')
                .on('click', '#delete', function(e){
                    $.post('includes/dbh.desabilitarUsuario.php',dados, function(retorna){

                        $('#ConfirmDelete').modal('hide');
                        $('#DesabilitarOk').fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
                        $.post('users_list.php',"", function(retorna){
                        });
                    });
                });                
            });
        });		
    </script>
</head>

<body>
       <div class="main-content">
       
            <label class="inline title">Usuários Cadastrados</label>
                <br/>
                <br/>
            <div id="pesquisa" class="border border-2">   
            &nbsp;&nbsp;<label class="title">Filtro</label>
                <form action="" method="post" id="register_form1" class="form-horizontal">
                    <div class="col-12 form-group mb-2">
						    &nbsp;&nbsp;&nbsp;&nbsp; 
	                        <label><b>Nome do usuário:</b></label> 
							<input class="shadow-sm rounded" size="30" type="text" name="nome_usuario" id="nome_usuario" placeholder="Nome do Usuário">
                            &nbsp;&nbsp;&nbsp;&nbsp;         
							<label><b>Login do usuário:</b></label> 
							<input class="shadow-sm rounded" size="30" type="text" name="login_user" id="login_user" placeholder="Login do Usuário">
                            &nbsp;&nbsp;<button type="button" class="btn btn-outline-primary search_data"  id="Btn_Pesquisar">Filtrar</button>							    
					</div>
                </form>        
        	</div>
            <div id="resultado">
                <br/>
                <button type="button" class="btn btn-outline-success add_user"  id="Btn_Cadastrar">Habilitar novo Usuário</button>
                <!--table id="Processos" class="table table-striped table-bordered" style="width:100%"> -->
                <table id="Usuarios" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">
                    <thead>
						<th> Id </th>
						<th> Login </th>
                        <th> Nome </th>
						<th> Perfil </th>
						<th> Ativo </th>
                        <th> Data Início </th>
                        <th> Data Fim </th>
                        <th> Ação</th>
                    </thead>
                </table>
            </div>
        </div>                                            
        <!-- janela alterar -->
        <div class="modal fade" id="EditUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
                <div class="modal-dialog" style="max-width: 80%;">
                    <div class="modal-content">
                        <div class="modal-header text-end">
                            <h5 class="modal-title" id="staticBackdropLabel">Dados do Usuário</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">                        
                            <p id="edit_usuario"></p>
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
                            <center><h5 class="modal-title" id="staticBackdropLabel">Desabilitar Usuário</h5></center>
                        </div>
                        <div class="modal-body" align="center">
                            <strong>
                                  Tem certeza que deseja desabilitar o usuário?                                    
                            </strong>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary" id="delete">Confirmar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>                            
                        </div>
            </div>  
        </div>
        <div class="alert alert-success fade" id="DesabilitarOk"><center>O acesso do usuário foi desabilitado com Sucesso!!</center></div>
</div>       

</body>
</html>