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
  $perfil =  $_SESSION['portfolio']['perfil']; 
  
}
else
{
  //retorna ao menu de login.
  Unset($_SESSION['portfolio']); // encerra a sessao.
  janela('index.php', '_self'); // retorna para janela de login
  exit();  
}
/* fim validacao de sessao */
?> 
<!DOCTYPE html>
<html>
<meta charset="UTF-8"/>
<style type="text/css">

html,
body {
  height: 100%;
  margin: 0;
}

.box {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.box .row {
  border: 1px dotted grey;
}

.box .row.header {
  flex: 0 1 auto; 
}

.box .row.content {
  flex: 1 1 auto;
}

    ul.menu,
    .menu li,
    .menu a {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
    }
    ul.menu ul {
        position: absolute;
        display: none;
        box-shadow: 3px 3px 2px #333;
    }
	
    ul.menu {
        float: left;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 15px;
        border-radius: 5px;
        padding: 0 5px;
    }
    .menu li {
        float: left;
        width: auto;
        position: relative;
    }
    .menu li a {
        display: block;
        padding: 0 20px;
        line-height: 45px;
        height: 45px;
        float: left;
        transition: all 0.1s linear;
    } 
	
    .menu li:hover > ul.submenu-1 {
        display: block;
        top: 45px;
        left: 0;
        padding: 5px;
        width: 200px;
        border-radius: 0 0 5px 5px;
    }
    .menu ul.submenu-1 a {
        width: 160px;
        padding: 0 20px;
        border-radius: 5px;
    }
	
    .menu li:hover > ul.submenu-2 {
        display: block;
        top: 0;
        left: 195px;
        padding: 5px;
        width: 200px;
        border-radius: 0 5px 5px 5px;
    }
    .menu ul.submenu-2 a {
        width: 160px;
        padding: 0 20px;
        border-radius: 5px;
    } /* Configurações nivel 3*/
    .menu li:hover > ul.submenu-3 {
        display: block;
        top: 0;
        left: 195px;
        padding: 5px;
        width: 200px;
        border-radius: 0 5px 5px 5px;
    }
    .menu ul.submenu-3 a {
        width: 160px;
        padding: 0 20px;
        border-radius: 5px;
    } 	
	
    .menu {
        background: #ccc;
		width: 99%;		
    }
    .menu a {
        color: #000;
    }
    .menu li:hover > a {
        background: #999;
        color: #fff;
    }
	
    .submenu-1 {
        background: #999;
    }
    .submenu-1 a {
        color: #fff;
    }
    .submenu-1 li:hover > a {
        background: #666;
    }
	
    .submenu-2 {
        background: #666;
    }
    .submenu-2 a {
        color: #fff;
    }
    .submenu-2 li:hover > a {
        background: #333;
    }
	
    .submenu-3 {
        background: #333;
    }
    .submenu-3 a {
        color: #fff;
    }
    .submenu-3 li:hover > a {
        background: #000;
    }	
 
body {
  margin: 0px;
  padding: 0px;
}

    .divTituloPag{
      background-color: #f5f5f5;
      width: 100%;
    }
	 
	.nav-side-menu{
  overflow: auto;
  font-family: arial;
  font-size: 12px;
  font-weight: 200;
  background-color: #2e353d;
  position: absolute;
  width: 16%;
  height: 89.1%;
  color: #e1ffff;
}
.nav-side-menu .brand{
  background-color: #23282e;
   display: block;
   font-size: 18px;
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
}
.nav-side-menu ul .active,
.nav-side-menu li .active {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #181c20;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #23282e;
  margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
  background-color: #020203;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  
 } 

.nav-side-menu ul .sub-sub-menu li:before,
.nav-side-menu li .sub-sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 20px;
  padding-right: 10px;
  vertical-align: middle;
  
}
.nav-side-menu li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
} 
.nav-side-menu li a {
  text-decoration: none;
  color: #e1ffff;
}
.nav-side-menu li a i {
  padding-left: 10px;
  width: 20px;
  padding-right: 20px;
}
.nav-side-menu li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
	.brand {
     text-align: center !important;
  }
  .topo {
    text-align: center !important;
    font-size: 20px;
    padding-left: 20px;
    line-height: 50px !important;
  }
@media (max-width: 767px) {
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
@media (min-width: 780px) {
  .nav-side-menu .menu-list .menu-content {
    display: block;
  }
}
body {
  margin: 0px;
  padding: 0px;
}
#outerdiv {
     height: 100%;
     bottom: 0;	 
}
#conteudo_interno {
    width: 100%;
    height: 100%;
}
.divTituloPag{
      background-color: #f5f5f5;
      display: inline-block;
      vertical-align: middle; 
      position: relative;             
  }

.conteudo iframe {
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
	
</style>
<body>  

<!-- JQuery Scripts -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- bootstrap Scripts -->
  <script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap5.min.js "></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
  
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">


  <script>
      $(".drop")
        .mouseover(function() {
        $(".dropdown").show(300);
      });
      $(".drop")
        .mouseleave(function() {
        $(".dropdown").hide(300);     
      }); 
  </script>

<div class="box">
  <div class="row header">
    <table width="100%" border="0">	
<tr height="5%"><td>
<!--Barra superior-->
<div id="titulo-pag" class="divTituloPag">

   <div style="position: relative; float: left; top: 12px;left: 10px;">
    	  <a href="http://portal.utfpr.edu.br/">
          <img alt="Logo da UTFPR" src="img/utfprlogo.png">
        </a>				
   </div>  

    <div  style="position: relative; left: 210px; top: 30px;">
        <strong style="font-size: 25px;">Portfólio de Processos - Gerenciamento </strong>
    </div>

    <div  style="vertical-align: top; position: relative; right: 200px; top: -15px; float: right;">
        <a href="http://portal.utfpr.edu.br/planejamento-e-administracao/planejamento/escritorio-de-processos/escritorio-de-processos">
          <img alt="Logo do EPROC"  src="img/logoeproc.png">
        </a>
  </div>
  <div  style="vertical-align: middle; position: relative; left: 20px; top: 5px; float: right; ">
        <strong> Usuário: </strong><?php echo $usuario; ?><br/>
        <strong> Perfil: </strong><?php echo $perfil; ?>
  </div>
  <div  style="position: relative; left: 180px; float: right;">
    <form id="login-form" class="form" action="logout.php" method="post">
       <button type="submit"  title="Sair" class="btn btn-outline-danger logout"  id="logout">
          <i class="bi bi-power"></i>
       </button>       
    </form>   
  </div>

</div>
<!-- Menu principal -->
<ul class="menu">
    <!-- Esse é o 1 nivel ou o nivel principal -->
    <?php /* if($perfil =='Admin'){ echo '<li><a href="macro_list.php" target="conteudo">Macroprocesso</a></li>'; } 
    
          if($perfil =='Admin'){ echo '<li><a href="area_list.php" target="conteudo">Nível 1</a></li>'; } 

          if($perfil =='Admin'){ echo '<li><a href="subarea_list.php" target="conteudo">Nível 2</a></li>'; } */ ?>
    <li><a href="process_list.php" target="conteudo">Processo</a>
		<!-- Esse é o 2 nivel ou o primeiro Drop Down
        <ul class="submenu-1">
            Esse é o 2 nivel ou o primeiro Drop Down
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Listar</a></li>
            <li>
                <a href="#">Submenu 3</a>
                <ul class="submenu-2">
                    Esse é o 3 nivel ou o Segundo Drop Down
                    <li><a href="#">Submenu 4</a></li>
                    <li><a href="#">Submenu 5</a></li>
                    <li>
                        <a href="#">Submenu 6</a>
                        <ul class="submenu-3">
                            Esse é o 4 nivel ou o Terceiro Drop Down
                            <li><a href="#">Submenu 7</a></li>
                            <li><a href="#">Submenu 8</a></li>
                            <li><a href="#">Submenu 9</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul> -->
    </li>
  <?php if($perfil =='Admin'){ echo '<li><a href="users_list.php" target="conteudo">Administração</a></li>'; } ?>
  <li><a href="preview/" target="_blank">Pré-Visualizar Publicação</a></li>
</ul>	      
</td>
</tr>
</table>
</div>

<div class="row content">
  <br/>
   <iframe  id="conteudo" name="conteudo"  class="conteudo" style="width: 100%; height: 100%;" frameborder="0"></iframe>
  </div>
  <div class="row footer">
    <div class="divTituloPag">
		<!--Barra inferior-->
		<center>
		  REITORIA Av. Sete de Setembro, 3165 - Rebouças CEP 80230-901 - Curitiba - PR - Brasil Telefone Geral +55 (41) 3310-4545
		</center>
	</div>
  </div>
</div>
</body>
</html>