<?php 
include_once "validaLogin.php";
include_once 'includes/dbh.php';

$erro_login="true";
session_start();

 function janela($win, $alvo) {
     echo('<script language=javascript> window.open("' . $win . '", "'. $alvo . '"); </script>');
 }
 function exibeMensagem($msg) {
     echo("<script language=javascript> alert('$msg'); </script>");
 }

 $login = $_POST["login"];
 $senha = $_POST["senha"];

 //valida se usuario esta cadastrado para uso do sistema
 $sql = "SELECT * FROM usuarios AS u  INNER JOIN permissoes AS p ON p.id=u.perfil WHERE login = '$login' AND ativo='S'";

 //buscando dados no banco de dados    
 $result = mysqli_query($conn, $sql);
 //verificando se existe usuário registrado para uso do sistema
 if (mysqli_num_rows($result))
 {
    $row = $result->fetch_assoc();
    $tipo = $row['tipo'];
    //verifica o tipo de acesso que o usuário tem.
    if($tipo == 1) 
    {
        if(md5($senha) == $row['password']) // validando a senha do usuário
        {
            $_SESSION['portfolio']['logado'] = 'SIM';
            $_SESSION['portfolio']['usuario'] = $login;
            $_SESSION['portfolio']['perfil'] = $row['nome'];
            $_SESSION['portfolio']['tempoLogado'] = time(); 

            //redirecionando para área principal.
            janela('principal.php', '_self');       
        }
        else
        {
            exibeMensagem('Login ou Senha incorreta.');
            Unset($_SESSION['portfolio']);
            janela('index.php', '_self');    
        }        
    }
    else // valida por LDAP o Login do usuário.
    {

        //existe usuário, validando o acesso junto ao LDAP.
        if(ValidaLoginLdap($login,$senha) == "ok")
        {
            
          //Setando variaveis de sessao
            $_SESSION['portfolio']['logado'] = 'SIM';
            $_SESSION['portfolio']['usuario'] = $login;
            $_SESSION['portfolio']['perfil'] = $row['nome'];
            $_SESSION['portfolio']['tempoLogado'] = time();
        
          //redirecionando para área principal.
            janela('principal.php', '_self');
        }
        else
        {        
            exibeMensagem('Login ou Senha incorreta.');
            Unset($_SESSION['portfolio']);
            janela('index.php', '_self');        
        }
    }
}
else // nao existe usuario cadastrado, voltar para janela de login
{
    exibeMensagem('Usuario nao habilitado.\r\n Contate o EPROC.');
    Unset($_SESSION['portfolio']);
    janela('index.php', '_self');        
}
?>