<?php
include "conn.php";

$result = $conn->query("select * from goodlist");
$goodlist = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $goodlist[$i] = $result->fetch_assoc();
}

echo json_encode($goodlist);
