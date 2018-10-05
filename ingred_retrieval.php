<?php

    $host =  'vergil.u.washington.edu'; #fill in with server name
    $dbname = 'list';    #fill in with db name
    $user = 'root';       #fill in with user name
    $password = 'JCSaavaa';

    $ds = "mysql:host={$host};dbname={$dbname};port=2314;";

    try {
        header("Content-Type: application/json");
        $db = new PDO($ds, $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rows = $db->query("SELECT * FROM ingredients;");
        $row = $rows->fetchAll(PDO::FETCH_ASSOC);
        $json_output = json_encode($row); 
        echo $json_output;
    } catch (PDOException $ex) {
        header("Content-Type: text/plain");
        print ("Can not connect to the database. Please try again later.\n");
        print ("Error details: $ex \n");
        die();
    }
?>