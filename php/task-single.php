<?php

require_once 'database.php';


 $id = $_POST['id'] ?? null;

 if($id){
    $query = "SELECT * FROM task WHERE id = $id";
    $result = mysqli_query($connection, $query);
    if(!$result){
      die("Hubo un error en la consulta de task-single". mysqli_error($connection));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)){
      $json[] = array(
          'id' => $row['id'],
          'name' => $row['name'],
          'description' => $row['description']
      );
    }
   
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
 }

?>