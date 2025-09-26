<?php

    require_once 'conn.php';

    
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $result = mysqli_query($conn, "SELECT * FROM Students WHERE id = $id");
        $row = mysqli_fetch_assoc($result);
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FORM</title>
    <link rel="stylesheet" href="./Styles/form.css">
</head>
<body>

    <form action="<?php if(isset($_GET['id'])){ echo "update.php?id=".$row['id']; }else{ echo "action.php";} ?>" method="post">
        <h2><?php if(isset($_GET['id'])){ echo "Edit Student Info"; }else{ echo "Enter New Student Info";} ?></h2>
        <label for="fname">First Name</label>
        <input type="text" name='fname' value="<?php if(isset($_GET['id'])){ echo $row['fname']; } ?>" >
        <label for="lname">Last Name</label>
        <input type="text" name ="lname" value="<?php if(isset($_GET['id'])){ echo $row['lname']; } ?>">
        <label for="email">Email</label>
        <input type="email" name="email" value="<?php if(isset($_GET['id'])){ echo $row['email']; } ?>">
        <label for="date_of_birth">Date of Birth</label>
        <input type="date" name='date_of_birth' value="<?php if(isset($_GET['id'])){ echo $row['date_of_birth']; } ?>">
        <button type="submit"><?php if(isset($_GET['id'])){ echo "Update"; }else{ echo "Submit";} ?></button>

    </form>
    
</body>
</html>