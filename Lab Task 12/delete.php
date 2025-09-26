<?php

    require_once 'conn.php';

    $id = $_GET['id'];

    $sql = "DELETE FROM Students WHERE id= $id";

    mysqli_query($conn, $sql);

    header("Location: index.php");
?>