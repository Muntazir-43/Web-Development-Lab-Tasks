<?php

    require_once 'conn.php';

    $sql = "INSERT INTO Students (fname,lname,email,date_of_birth) VALUES ('".$_POST['fname']."','".$_POST['lname'] ."','".$_POST['email'] ."', '".$_POST['date_of_birth']."')";

    mysqli_query($conn, $sql);

    header("Location: index.php")

?>