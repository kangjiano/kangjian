<?php
include "conn.php";
if (isset($_POST['xingming'])) {
    $name = @$_POST['xingming'];
    $result = $conn->query("select * from registry where username='$name'");
    if ($result->fetch_assoc()) {
        echo 1;
    } else {
        echo 0;
    }
} else {
    exit('非法操作');
}

if (isset($_POST['xingming']) && isset($_POST['password'])&& isset($_POST['mobile'])) {
    echo 1;
    $user = $_POST['xingming'];
    $pass = $_POST['password'];
    $iphone = $_POST['mobile'];
    $conn->query("insert registry values(null,'$user','$pass',NOW(),'$iphone')");
    // header('location:http://localhost/JS1909/Day%2022/loginregistry/src/login.html');//php的跳转
}
