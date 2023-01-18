<?php
session_start();

# Discard all the persisted variables & values
session_destroy();
header("Location: /index.php");