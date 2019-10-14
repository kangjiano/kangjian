<?php
include "conn.php";
if (isset($_POST['xingming1']) && isset($_POST['mobile'])) {
    echo 1;
    $iname = $_POST['xingming1'];
    $iphone = $_POST['mobile'];
    $conn->query("update registry set phonenumber=$iphone where username='$iname'");
}
