<?php
function ValidaLoginLdap($login,$senha)
{ 
    $ldaphost = '200.19.73.101';
    $ldapport = 389;
    $ldaprdn  = ',ou=tecadm,ou=servidores,ou=usuarios,ou=colaboradores,ou=todos,dc=utfpr,dc=edu,dc=br';
    
    // Connect to the LDAP server.
    $ldapconn = ldap_connect($ldaphost, $ldapport) or die("Could not connect to " . $ldaphost . ":" . $ldapport . ".");
    ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
    $ldapbind = ldap_bind($ldapconn, "uid=".$login.$ldaprdn, $senha);
    if ($ldapbind)
    {    
      ldap_close($ldapconn);    
      return "ok";
    }
    else
    {
      ldap_close($ldapconn);    
      $ldaprdn  = ',ou=professores,ou=servidores,ou=usuarios,ou=colaboradores,ou=todos,dc=utfpr,dc=edu,dc=br';
      // Connect to the LDAP server.
      $ldapconn = ldap_connect($ldaphost, $ldapport) or die("Could not connect to " . $ldaphost . ":" . $ldapport . ".");
      ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
      ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
      $ldapbind = ldap_bind($ldapconn, "uid=".$login.$ldaprdn, $senha);
      if ($ldapbind)
      {    
        ldap_close($ldapconn);    
        return "ok";
      }
      else
      {
		ldap_close($ldapconn);    
		$ldaprdn  = ',ou=cterceiros,ou=servidores,ou=usuarios,ou=colaboradores,ou=todos,dc=utfpr,dc=edu,dc=br';
		// Connect to the LDAP server.
		$ldapconn = ldap_connect($ldaphost, $ldapport) or die("Could not connect to " . $ldaphost . ":" . $ldapport . ".");
		ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
		ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
		$ldapbind = ldap_bind($ldapconn, "uid=".$login.$ldaprdn, $senha);
		if ($ldapbind)
		{    
			ldap_close($ldapconn);    
			return "ok";
		}
		else
		{
			ldap_close($ldapconn);    
			return "erro";
		} 
	  }
    }
    
}
?>
