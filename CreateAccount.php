<?php
$conn = new mysqli("localhost", "root", null, "towerdefense");






session_start();

$newUserName = $_REQUEST['new_username'];
$newPassword_1 = $_REQUEST['new_password_1'];
$newPassword_2 = $_REQUEST['new_password_2'];


//if passwords dont match

//if username already exists

$mismatchedPasswords = true;

$existantUserName = false;

$sql = "SELECT * FROM `users`;";
$query = $conn->prepare($sql);
$query->execute();
$result = $query->get_result();

foreach($result as $row){
    if($newUserName==$row['UserName']){
        $existantUserName = true;
    }
}

if($newPassword_1==$newPassword_2){
    $mismatchedPasswords = false;
}

if($mismatchedPasswords){
    $_SESSION['badpw'] = true;
}
elseif($existantUserName){
    $_SESSION['usedUN'] = true;
}
else{
    //http://localhost/CreateAccount.php?new_username
    if(isset($_REQUEST['new_username'])){
        if(isset($_REQUEST['new_password_1'])){
            if(isset($_REQUEST['new_password_2'])){
    
     
    $sql = "INSERT INTO `users` (`UserName`, `Password`, `HighScore`) VALUES (?, ?, 0);";
    $query = $conn->prepare($sql);
    $query->bind_param("ss", $newUserName, $newPassword_1);
    $query->execute();
    $_SESSION['newUser'] = true;
    $_SESSION['usedUN'] = false;
    $_SESSION['badpw'] = false;
    $_SESSION['username'] = $newUserName;
    $_SESSION['highscore'] = 0;
}
}
}
}

header("Location: /index.php");