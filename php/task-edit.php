<?php

require_once ('database.php');


$id = mysqli_real_escape_string($connection, $_POST['id']) ?? null;
$name = mysqli_real_escape_string($connection, $_POST['name']) ?? null;
$description = mysqli_real_escape_string($connection, $_POST['description']) ?? null;

$query = "UPDATE task SET name = '$name', description = '$description'
            WHERE id = '$id'";

$result = mysqli_query($connection, $query);

if(!$result){
    die("Consulta al update fallida". mysqli_error($connection));
}

echo "Tarea actualizada con exito";

?>