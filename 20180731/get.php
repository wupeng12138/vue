<?php
    header('Access-Contorl-Allow-Origin:*');
    $a=$_GET['a'];
    $b=$_GET['b'];
    echo $a + $b;
?>