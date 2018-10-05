<?php

    $host =  'vergil.u.washington.edu'; #fill in with server name
    $dbname = 'list';    #fill in with db name
    $user = 'root';       #fill in with user name
    $password = 'JCSaavaa';

    $ds = "mysql:host={$host};dbname={$dbname};port=2314;";
    $db = new PDO($ds, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $ingred = $_POST["ingred"];
    $category = $_POST["category"];
    $requester = $_POST["requester"];
        
    $sql = "INSERT INTO ingredients VALUES (:ingred, :category, :requester );";
    $stmt = $db->prepare($sql);
    $params = array("ingred" => $ingred, "category" => $category, "requester" => $requester);
    $stmt->execute($params);
?>        
        