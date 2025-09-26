<?php

    require_once 'db.php';

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        $first_name = $_POST['fname'];
        $last_name = $_POST['lname'];
        $email = $_POST['email'];
        $date_of_birth = $_POST['date_of_birth'];

        $sql = "INSERT INTO students (fname,lname,email,date) VALUES ('$first_name','$last_name','$email','$date_of_birth')";

        mysqli_query($conn, $sql);

        header("Location: index.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADD Student</title>
    <link rel="stylesheet" href="./Styles/form.css">
</head>
<body>
    
    <form method="POST">
        <h1>ADD STUDENT</h1>
        <label for="fname">First Name</label>
        <input type="text" name="fname">
        <label for="lname">Last Name</label>
        <input type="text" name="lname">
        <label for="email">Email</label>
        <input type="email" name="email">
        <label for="date_of_birth">Date of Birth</label>
        <input type="date" name="date_of_birth">
        <button type="submit">Submit</button>
    </form>

</body>
</html>