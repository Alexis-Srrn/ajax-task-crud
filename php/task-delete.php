<?php
require_once 'database.php';
$id = $_POST['id'] ?? null;

if($id){
    echo "en backend tenemos un ". $id;
    $query = "DELETE FROM task WHERE id = $id";

    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Error en la consulta '. mysqli_error($connection));
    }
    echo "Tarea eliminada con exito";
}

?>