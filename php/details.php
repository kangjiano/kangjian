<?php
include "conn.php";
header('content-type:text/html;charset=utf-8');
if(isset($_GET['id'])){
    $sid=$_GET['id'];
    $result=$conn->query("select * from goodpic where sid=$sid");
    echo json_encode($result->fetch_assoc());
}