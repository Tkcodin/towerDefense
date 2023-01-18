<?php
$conn = new mysqli("localhost", "root", null, "towerdefense");


session_start();

$badUserDetails = true;
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];

$sql = "SELECT * FROM `users` WHERE `UserName` = ?;";
$query = $conn->prepare($sql);		
$query->bind_param("s", $username);
$query->execute();
$result = $query->get_result();

$userNameMissing = true;

foreach ($result as $row) {

if($username = $row['UserName']){
    $userNameMissing = false;     
}  
if($password==$row['Password']){
    $_SESSION['username'] = $username;
    $_SESSION['highscore'] = $row['HighScore'];
    $badUserDetails = false;

}
}
// if($userNameMissing){
//     $_SESSION['noUser'] = true;
// }
if($userNameMissing){
    $badUserDetails = true;
}
if($badUserDetails){
    $_SESSION['badUserDetails'] = true;
}
else{
    $_SESSION['badUserDetails'] = false;
}







header("Location: /index.php");