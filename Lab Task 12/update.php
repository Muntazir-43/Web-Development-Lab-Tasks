<?php

    require_once 'conn.php';

    $id = $_GET['id'];

    $sql = "UPDATE Students SET fname= '".$_POST['fname']."', lname='".$_POST['lname']."', email='".$_POST['email']."', date_of_birth='".$_POST['date_of_birth']."' WHERE id=$id ";

    mysqli_query($conn, $sql);

    header("Location: index.php");

?>