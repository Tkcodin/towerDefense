<?php
$conn = new mysqli("localhost", "root", null, "towerdefense");
session_start();
$username = $_SESSION['username'];
$games = 0;
$totalScore = 0;
$highScore = 0;
$newScore = intval($_REQUEST['scoreBackUp']);



$sql = "SELECT * FROM `users` WHERE `UserName` = ?;";
$query = $conn->prepare($sql);		
$query->bind_param("s", $username);
$query->execute();
$result = $query->get_result();

foreach ($result as $G) {
    $games = $G['GameCount'] + 1;
    $totalScore = $G['TotalScore'] + $newScore;
    if($newScore > $G['HighScore']){
        $highScore = $newScore;
        $_SESSION['highscore'] = $highScore;
        ?>
        <script>
        document.getElementById("main_header").innerHTML = "Welcome, <?=$_SESSION['username']?>! Your high score is: <?=$_SESSION['highscore']?>!";
        </script>
        <?php
    }
    else{
        $highScore = $G['HighScore'];
    }
}



$sql2 = "UPDATE `users` SET `HighScore` = $highScore, `GameCount` = $games, `TotalScore` = $totalScore WHERE `Username` = ?;";
$query = $conn->prepare($sql2);		
$query->bind_param("s", $username);
$query->execute();

// $sql2 = "UPDATE `users` SET `GameCount` = 1 WHERE `UserName` = ?;";
// $query = $conn->prepare($sql2);		
// $query->bind_param("s", $username);
// $query->execute();



header("Location: /index.php");