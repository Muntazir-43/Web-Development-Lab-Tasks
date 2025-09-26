<?php
    require_once 'db.php';

    $sql = "CREATE DATABASE practice";
    if(mysqli_query($conn, $sql)){
        echo "Successfully Created database";
    }else{
        echo "Error in Database Creation ". mysqli_error($conn);
    }

    mysqli_select_db($conn,'practice');

    $sql ="CREATE TABLE students (
    ID INT(6) AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    date DATE
    )";

    if(mysqli_query($conn, $sql)){
        echo "Successfully Created practice";
    }else{
        echo "Failed in creation table". mysqli_error($conn);
    }
?>