<?php 

    $dbServername = "treinosei.utfpr.edu.br";
    $dbUsername = "root";
    $dbPassword = "utf2009";
    $dbName = "ger_portfolio_prod";


    $conn = mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName); 
    mysqli_set_charset($conn,'UTF8');

    if($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    //echo “Connected successfully”;
    

    
?>