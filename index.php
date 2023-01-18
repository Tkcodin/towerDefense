<?php session_start();
$conn = new mysqli("localhost", "root", null, "TowerDefense");
$loggedIn = false;
?>
<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8" />
        <title>
            'Save Ali' Tower Defense
        </title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>

    <body>
        <header id="main_header">
            <?php if (isset($_SESSION['username'])) {
                $loggedIn = true;
            ?>  
                
                Welcome, <?=$_SESSION['username']?>! Your high score is: <?=$_SESSION['highscore']?>!
                
            <form action="logOut.php" method="post">
            <input type="submit" value="Log out">
            </form>
            <?php
            } 
            // /** 
            
            elseif(isset($_SESSION['badpw'])){
                if($_SESSION['badpw']==true){
                ?>
                Your Passwords did not match! Please try again
                <br>
                <form action="logIn.php" method="post">
                    User Name<input type="text" name="username">
                    Password<input type="password" name="password">
                    <input type="submit" value="Log in">
                </form>
                </br>
                <form action="CreateAccount.php" method="post">
                    User Name<input type="text" name="new_username">
                    Password<input type="password" name="new_password_1">
                    Confirm Password<input type="password" name="new_password_2">
                    <input type="submit" value="Create Account">
                <?php   
                } 
            }
            
            elseif(isset($_SESSION['usedUN'])){
                if($_SESSION['usedUN']==true){
                ?>
                That username already exists! Please try again
                <br>
                <form action="logIn.php" method="post">
                    User Name<input type="text" name="username">
                    Password<input type="password" name="password">
                    <input type="submit" value="Log in">
                </form>
                </br>
                <form action="CreateAccount.php" method="post">
                    User Name<input type="text" name="new_username">
                    Password<input type="password" name="new_password_1">
                    Confirm Password<input type="password" name="new_password_2">
                    <input type="submit" value="Create Account">
                <?php  
                }
            }
            
            elseif(isset($_SESSION['newUser'])){
                if($_SESSION['newUser']==true){
                ?>
                New Account Created! Please log in
                <br>
                <form action="logIn.php" method="post">
                    User Name<input type="text" name="username">
                    Password<input type="password" name="password">
                    <input type="submit" value="Log in">
                </form>
                </br>
                <form action="CreateAccount.php" method="post">
                    User Name<input type="text" name="new_username">
                    Password<input type="password" name="new_password_1">
                    Confirm Password<input type="password" name="new_password_2">
                    <input type="submit" value="Create Account">
                <?php  
                }
            }
            
            
            elseif(isset($_SESSION['badUserDetails'])){
                if($_SESSION['badUserDetails']==true){
                ?>
                No user matches those details! Please try again
                <br>
                <form action="logIn.php" method="post">
                    User Name<input type="text" name="username">
                    Password<input type="password" name="password">
                    <input type="submit" value="Log in">
                </form>
                </br>
                <form action="CreateAccount.php" method="post">
                    User Name<input type="text" name="new_username">
                    Password<input type="password" name="new_password_1">
                    Confirm Password<input type="password" name="new_password_2">
                    <input type="submit" value="Create Account">
                <?php  
                }
            }
            // */
            else {
                ?>
                <form action="logIn.php" method="post">
                     User Name<input type="text" name="username" required>
                     Password<input type="password" name="password" required>
                    <input type="submit" value="Log in">
                </form>
                </br>
                <form action="CreateAccount.php" method="post">
                    User Name<input type="text" name="new_username" required>
                    Password<input type="password" name="new_password_1" required>
                    Confirm Password<input type="password" name="new_password_2" required>
                <input type="submit" value="Create Account">
                 <?php
            }
            if($loggedIn){
    ?>
        
        </header>
        <div id="info_board">
            <form action="update.php" method="post">
            <input type="text" name="scoreBackUp" id="formScore"></input> 
            <input type="submit" value="Update Scores" id="formButton"/>
            </form>
            <button id="highScores">View Scores</button>
            
            
            <button id="restart">New Game</button>
            <label id="level">Level = 0</label>
            <label id="score">Score = 0</label>
            <label id="health">Health = 10</label>
            
            <label id="gold">Gold = 0</label>

        </div>
        <main>
        <div id = "scoreTable">
            <table>
            <tr><th>Username: </th>
                <th>High Score: </th>
                <th>Average Score: </th>
            </tr>
        <?php
        
            $result = $conn->query("SELECT * FROM `users` ORDER BY `HighScore` DESC");
            foreach($result as $row){ ?>
                <tr><td><?php echo $row['UserName']?></td>
                <td><?php echo $row['HighScore']?></td>
                
                <?php
                if($row['GameCount'] > 0){
                    $averageScore = $row['TotalScore']/$row['GameCount'];
                }
                else{
                    $averageScore = 0;
                }
                

                ?>
                <td><?php echo round($averageScore, 2) ?></td></tr><?php
            }
        
        ?>
        </table>
        </div>
        <canvas id="main_canvas">
                
        </canvas>
        
        </main>
        <?php } ?>
        <script src="script.js" type="module">
            
        </script>
    </body>
</html>