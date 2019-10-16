<?php
    include "conn.php";
    $result=$conn->query("select * from goodpic");
    $goodsarr=array();
    for($i=0;$i<$result->num_rows;$i++){
        $goodsarr[$i]=$result->fetch_assoc();
    }

    echo json_encode($goodsarr);