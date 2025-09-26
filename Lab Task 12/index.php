<?php

    require_once 'conn.php';

    $result= mysqli_query($conn, "SELECT * FROM Students");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>SMS</title>
    <link rel="stylesheet" href="./Styles/style.css">
</head>
<body>
    <h1>Student Management System</h1>
    <a href="form.php">Add Student</a>
    <table>
        <thead>
            <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Semester</th><th>Actions</th>
        </thead>
        <tbody>
            <?php

            while($row = mysqli_fetch_assoc($result)){
                echo "<tr>";

                echo "<td>". $row['id']. "</td>";
                echo "<td>". $row['fname']. "</td>";
                echo "<td>". $row['lname']. "</td>";
                echo "<td>". $row['email']. "</td>";
                echo "<td>". $row['date_of_birth']. "</td>";
                echo "<td> 
                    <a href='form.php?id=". $row['id']. "'>Edit</a> 
                    <a href='delete.php?id=". $row['id']. "' onclick=\"return confirm('Are you sure you want to delete this student?');\">Delete</a>
                </td>";
                echo "</tr>";
            }
            
            ?>

        </tbody>
    </table>
</body>
</html>