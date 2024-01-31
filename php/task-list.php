<?php
include_once ('database.php');

$query = "SELECT * from task";
$result = mysqli_query($connection, $query);

if(!$result){
    die('Consulta fallida'. mysqli_error($connection));
}

while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description']
    );
}
    $jsonstring =  json_encode($json);
    echo $jsonstring;

?>