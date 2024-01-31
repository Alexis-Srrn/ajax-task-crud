<?php

include_once ('database.php');
$search = isset($_POST['search']) ? $_POST['search'] : null;

if($search){
    $query = "SELECT * FROM task WHERE name LIKE '$search%'";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Error en la consulta '. mysqli_error($connection));
    }

    /*Si la consulta fue un exito tenemos que convertir los datos obtenidos
    En formato JSON para que podamos pasarlos al front end
    Esto es por fin pasar datos de PHP a JavaScript*/
    
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
        );
    }
    //metodo que convierte mi array $json en un JSON
    //lo devuelve en un string

    $jsonstring = json_encode($json[0]);//volvemos nuestro JSON array en un string
    echo $jsonstring; //lo devuelve al front end como un string
}

?>