<?php

include_once ('database.php');


if(isset($_POST['name']) && isset($_POST['description'])){
    $name =  mysqli_real_escape_string($connection, $_POST['name']);
    $description = mysqli_real_escape_string($connection,$_POST['description']);
    $query = "INSERT INTO task(name, description)
    VALUES ('$name', '$description')";

   $result = mysqli_query($connection, $query);
   if(!$result){
    die('La consulta ha fallado' . mysqli_error($connection));
   }
   echo 'Tarea agregada con éxito';
}

?>