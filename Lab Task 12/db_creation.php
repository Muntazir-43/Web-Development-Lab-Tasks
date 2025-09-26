<?php

    require_once 'conn.php';

    if(mysqli_query($conn, "CREATE DATABASE Students")){
        echo "successfully database created\n";
    }else{
        echo "failed :". mysqli_error($conn);
    }

    mysqli_select_db($conn, "Students");

    if(mysqli_query($conn, "CREATE TABLE Students (
        id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        fname VARCHAR(255) NOT NULL,
        lname VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        date_of_birth Date NOT NULL
    )")){
        echo "successfully table created";
    }else{
        echo "failed :". mysqli_error($conn);
    }
?>