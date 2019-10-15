<?php
    include "conn.php";
    
    $result=$conn->query("select * from goodpic");
    $goodpic=array();
    for($i=0;$i<$result->num_rows;$i++){
        $goodpic[$i]=$result->fetch_assoc();
    }

    echo json_encode($goodpic);