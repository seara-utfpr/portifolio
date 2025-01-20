<?php 
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);

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
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
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
<head>
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
</head>
<script type="text/javascript" charset="UTF-8" src="https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap5.min.js "></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">


<!------ Include the above in your HEAD tag ---------->
<body>
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
</div>
    <div id="divlogin">
        <h3 class="text-center  pt-5">Acesso ao Sistema Gerenciador</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" action="logon.php" method="post">
                            <div class="form-group">
                                <label for="login" class="text-info">Login:</label><br>
                                <input type="text" name="login" id="login" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="senha" class="text-info">Senha:</label><br>
                                <input type="password" name="senha" id="senha" class="form-control">
                            </div> 
                            <div class="form-group">
                                <input type="submit" name="logon" id="logon" class="form-control" value = "Entrar">
                            </div>                                                     
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>