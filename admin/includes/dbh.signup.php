<?php
        include_once 'dbh.php';
        include_once 'classes.php';

        $nome = $_POST['userName'];
        $user = new User($_POST['userName'],$_POST['firstName'],$_POST['lastName'],$_POST['email'],$_POST['password']);



        //Querry de cadastro de Usuario
        $sql = "INSERT INTO auth_user(username, first_name, last_name, email, password, is_staff, is_superuser ,is_active, date_joined) 
                VALUES('$user.getUserName()','$user.getFirstName()', '$user.getLastName()', '$user.getEmail()', '$user.getPassword()' );";
        $result = mysqli_query($conn, $sql);
        $resultcheck = mysqli_num_rows($result);
        header("location: ../index.php?newprocess=sucess");