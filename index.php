<?php
/* Informa o nível dos erros que serão exibidos */
error_reporting(E_ALL);
 
/* Habilita a exibição de erros */
ini_set("display_errors", 1);
//Realizando parser do XML para montagem do Menu.
//$macroprocesso ='';

/* inicio validacao de sessao */
function janela($win, $alvo) {
  echo('<script language=javascript> window.open("' . $win . '", "'. $alvo . '"); </script>');
}
 
 //execução principal
 //carregando menu dos macroprocessos
 //$menu = processarXML('macroprocessos/Macroprocessos.xml');


 function gera_menu($cod_ul_pai,$id_do_pai,$tipo_macro){
  include 'dbh.php';
  //gera um menu ul com submenus
   //exemplo: gera_menu("<ul>","    ",0)
   if ($tipo_macro != 0)
   {
		$query  ="SELECT id_processo,nome_processo FROM processo WHERE parent_id ='".$id_do_pai."' and situacao_id= 1 and tipo_macro='".$tipo_macro."' 
				  UNION 
				  SELECT id_processo,nome_processo FROM processo WHERE parent_id ='".$id_do_pai."' and situacao_id= 1 and tipo_macro='".$tipo_macro."' order by nome_processo asc		
		";
   }
   else
   {
	   $query  ="SELECT id_processo,nome_processo FROM processo WHERE parent_id ='".$id_do_pai."' and situacao_id= 1 and macro='S'
				 UNION
				 SELECT id_processo,nome_processo FROM processo WHERE parent_id ='".$id_do_pai."' and situacao_id= 1  and macro='S' order by nome_processo asc
	   ";
   }
  $result = mysqli_query($conn,$query);
  $ret = $cod_ul_pai;
  if($result){
      while($linha = mysqli_fetch_assoc($result)){
          $ret.= '<li data-toggle="collapse" data-target="#id'.$linha['id_processo'].'" class="collapsed active"><a href="Processo.php?id_processo='.$linha['id_processo'].'" target="conteudo">&nbsp;'.$linha['nome_processo'];
          
          //testando se tem filhos
              $query = "SELECT id_processo,nome_processo FROM processo WHERE parent_id ='".$linha['id_processo']."'
						UNION
						SELECT id_processo,nome_processo FROM processo WHERE parent_id ='".$linha['id_processo']."' and situacao_id=1 order by nome_processo asc
						";
              $recfilho = mysqli_query($conn,$query);
              if(mysqli_num_rows($recfilho)>0)
              {
                  $ret.= '<span class="arrow"></span>';
                  $ret.= '</a></li>'; 
                  if($id_do_pai == 0 )
				  {
					$ret .= gera_menu('<ul class="sub-menu collapse" id="id'.$linha['id_processo'].'">',$linha['id_processo'], 0);
				  }
				  else
				  {
					$ret .= gera_menu('<ul class="sub-sub-menu collapse" id="id'.$linha['id_processo'].'">',$linha['id_processo'], 0);
				  }
              }
              $ret.= '</a></li>'; 
          //fim filhos          
      }
  }
  $ret .="</ul>"; 
  return $ret;
}

 $menu_finalistico    = gera_menu("<ul>",0,1);
 $menu_estrategico    = gera_menu("<ul>",0,2);
 $menu_administrativo = gera_menu("<ul>",0,3);
 
//echo "menu<br/>". $menu;
?>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Portfólio de Processos - Pré Visualização - Não Publicados </title>

<link rel="apple-touch-icon-precomposed" sizes="57x57" href="img/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/pple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="img/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="img/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="img/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="img/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="img/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="img/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="img/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="img/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="img/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="img/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="img/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="img/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="img/mstile-310x310.png" />

<script src="scripts/jquery/jquery-3.5.1.min.js"></script>
<script src="scripts/jquery.layout.js" type="text/javascript"></script>


<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css" rel="stylesheet">


<script src="scripts/js/imageMapResizer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<script type="text/javascript">
  //<![CDATA[
    var myLayout; 
    $(document).ready(function () {
      myLayout = $('body').layout({
        north__size: 72,
        north__spacing_open: 0,        
        south__spacing_open: 0,        
        west__size: 400,
        west__spacing_closed: 15,
        west__togglerLength_closed: 100,
        west__spacing_open: 7,
        west__togglerAlign_closed: "top",
        west__togglerAlign_open:"center",
        west__togglerContent_closed:"M<br />E<br />N<br />U",
        west__togglerTip_closed:"Exibir o painel e deix\u00E1-lo fixo",
        west__sliderTip: "Abrir menu",
        //west__slideTrigger_open: "mouseover",
        west__initClosed: false,        
        east__size: 300,
        east__spacing_closed: 15,
        east__togglerLength_closed: 300,
        east__spacing_open: 7,
        east__togglerAlign_closed: "top",
        east__togglerAlign_open:"center",
        east__togglerContent_closed:"A<br />N<br />I<br />V<br />E<br />R<br />S<br />A<br />R<br />I<br />A<br />N<br />T<br />E<br />S",
        east__togglerTip_closed:"Exibir o painel e deix\u00E1-lo fixo",
        east__sliderTip: "Abrir menu",
        //east__slideTrigger_open: "mouseover",
        east__initClosed: true                
      });		     
    });  
  //]]>   
  </script>
<script>
    function carregar(pagina){
	    $("#conteudo_interno").load(pagina);
    }
 
</script>
<style>

    .divTituloPag{
      background-color: #f5f5f5;
      width: 100%;
	  position: relative;	  
	  margin-left: 15px;
    }
	
	.nav-side-menu{
  overflow: auto;
  font-family: arial;
  font-size: 12px;
  font-weight: 200;
  #background-color: #2e353d;
  background-color: #fbe5ac;
  position: absolute;
  width: 26%;
  height: 89.1%;
  color: #e1ffff;
}
.nav-side-menu .brand{
  background-color: #f7cd67;
  color:#000000;
   display: block;
   font-size: 22px;
}
.nav-side-menu .toggle-btn {
  display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 35px;
  cursor: pointer;  
}
.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  float: right;
}
.nav-side-menu ul .active,
.nav-side-menu li .active {
  border-left: 3px solid #f7cd67;
  background-color: #fbe5ac;  
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #000000;  
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #000000;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #fbe5ac;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #f7cd67;
  margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
  background-color: #f7cd67;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 15px;
  padding-right: 10px;
  vertical-align: middle;
  margin-left: 5px;  
 } 

.nav-side-menu ul .sub-sub-menu li:before,
.nav-side-menu li .sub-sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 30px;
  padding-right: 10px;
  vertical-align: middle;
  margin-left: 5px;  
 } 



.nav-side-menu li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
} 
.nav-side-menu li a {
  text-decoration: none;
  color: #000000;
}
.nav-side-menu li a i {
  padding-left: 10px;
  width: 20px;
  padding-right: 20px;
}
.nav-side-menu li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #f7cd67;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
	.brand {
     text-align: center !important;
  }
  .brand_macro {
     text-align: left !important;
	 border-left: 3px solid #2e353d !important;
	 border-bottom: 1px solid #23282e !important;
	 background-color: #4f5b69 !important;
	 
  }
  
    .brand_macro a {
     color: #ffffff !important
	 
  }
  
  .topo {
    text-align: center !important;
    font-size: 20px;
    padding-left: 20px;
    line-height: 50px !important;
  }

@media (max-width: 867px) {
  .nav-side-menu {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }
  .nav-side-menu .toggle-btn {
    display: block;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10 !important;
    padding: 3px;
    background-color: #ffffff;
    color: #000;
    width: 40px;
    text-align: center;
  }
  
}
@media (min-width: 890px) {
  .nav-side-menu .menu-list .menu-content {
    display: block;
  }
}

.tbl{
    position:fixed;
    width:100%;
    border:3px solid #fff;
    background:#000;
    box-sizing:border-box; /* causes item size to include border and padding */
    -moz-box-sizing:border-box; /*for browser compatibility*/
}
body {
  height:100%;
  width:100%;
  margin: 0px;
  padding: 0px;
}
#outerdiv {
    width: 84%;
    height: 89.1%;
}
#conteudo_interno {
    width: 100%;
    height: 100%;
} 



/* layout jquery */
.ui-layout-pane {
	background: #f1eee5; 
	border: 1px solid #BBB; 
	padding: 0px; 
	overflow: auto;
} 
.ui-layout-resizer {
	background: #DDD; 
} 
.ui-layout-toggler { 
	background: #AAA; 
} 
.ui-layout-toggler-closed { 
	background:#99CCFF;
	border-bottom: 1px solid #BBB; 
} 
.ui-layout-toggler .content {
	font: 14px bold Verdana, Verdana, Arial, Helvetica, sans-serif;		
}
.ui-layout-toggler:hover { 
	background: #DCA; 
} 
.ui-layout-toggler-open {
/********************************************************************************************************************************************/
	background: url(/imagem/toggle-lt.gif) no-repeat top;
}
.ui-layout-toggler-open:hover {
/********************************************************************************************************************************************/
	background: url(/imagem/toggle-lt.gif) no-repeat top;
}	
.ui-layout-toggler:hover .content { 
	color: #009; 
}
.ui-layout-resizer-open:hover { 
	background: #99CCFF; 
}



</style>


</head>
<body>
<!--Barra superior-->
<div class="ui-layout-north">
<table border="0" width="100%">	
    <tr>
        <td>
            <table border="0" width="100%">
                <tr>
                    <td>
                        <a href="http://portal.utfpr.edu.br/"><img alt="Logo da UTFPR" src="img/utfprlogo.png"></a>
                    </td>
                    <td style="text-align: center;">
                        <h4><strong> Portfólio de Processos da UTFPR</strong></h4>
                    </td>	
                    <td style="display: inline-block; horizontal-align: right;">
                        <a href="http://portal.utfpr.edu.br/planejamento-e-administracao/planejamento/escritorio-de-processos/escritorio-de-processos"><img alt="Logo do EPROC"  src="img/logoeproc.png"></a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</div>
<!--Barra esquerda - Menu-->
<div class="ui-layout-west nav-side-menu">
<!------ Menu ---------->

    <div><center><a href="index.php" class="brand" >Processos</a></center></div>

	<i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

      <div class="menu-list">
		<div class="brand_macro"><a href="finalisticos.html"  target="conteudo">Finalísticos</a></div>
            <ul id="menu-content" class="menu-content collapse out">
			    <? echo $menu_finalistico; //colocando o menu na posição correta.?>
            </ul>
		<div class="brand_macro"><a href="gestaoEstrategica.html"  target="conteudo">Gestão Estratégica</a></div>
            <ul id="menu-content" class="menu-content collapse out">
			    <? echo $menu_estrategico; //colocando o menu na posição correta.?>
            </ul>	
		<div class="brand_macro"><a href="gestaoExecutiva.html"  target="conteudo">Gestão Executiva</a></div>
            <ul id="menu-content" class="menu-content collapse out">
			    <? echo $menu_administrativo; //colocando o menu na posição correta.?>
            </ul>		
     </div>

</div>

<!--Barra Central - Conteúdo-->
<div class="ui-layout-center">
<iframe id="conteudo" name="conteudo" width="100%" height="100%" valign="top" frameborder="0" src="cadeia.html"></iframe>
</div>

<!--Rodapé-->
<div class="ui-layout-south">
<div id="titulo-pag">
     	<center>
            REITORIA Av. Sete de Setembro, 3165 - Rebouças CEP 80230-901 - Curitiba - PR - Brasil Telefone Geral +55 (41) 3310-4545
        </center>
      </div>
</div>	  
</body>
</html>