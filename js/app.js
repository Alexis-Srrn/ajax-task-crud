$(function(){

    /**
     * En esta aplicacion tenemos un solo formulario
     * en este agregamos tareas, pero cuando queremos editar una tarea
     * lo haremos desde el mismo formulario
     * para saber si queremos agregar una nueva tarea o editar una ya 
     * existente usaremos una variable editar como bandera
     */
    let editar = false;


    console.log('jQuery está funcionando');
    $('#task-result').hide();
    fetchTasks();
   //Capturar evento de teclear en barra de busqueda
    $('#search').keyup(function(e){
        if($('#search').val()){
            let search =  $('#search').val();
            //console.log(search);
            
            
            /*usar el método ajax de jquery*/
            $.ajax({
                url: 'php/task-search.php', //Donde se encuentra el archivo de servidor con el que conectar
                type: 'POST', //si es GET es que vamos a recibir de servidor, POST si vamos a enviar algo
                data: {search: search}, //vamos a mandar un objeto una propiedad llamada search, y su valor es la variable search
                success: function(response){
                    let tasks = JSON.parse(response); //el json estring que recibimos ahora lo regresamos a formato JSON
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                            ${task.name}
                        </li>`;                    
                    });
                    
                    if(template != ''){
                        $('#container').html(template);
                        $('#task-result').show();
                    }
                    
                }
            });
        }else{
            $('#task-result').hide(); 
        }
    });

    //Capturar evento de submit en el formulario
    $('#task-form').submit(function(e){
        //creamos un objeto llamado postData y lo rellenamos con los campos del formulario
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val(),
        };

        /**Vamos a darle una url como valor dependiento de
         * si la bandera edit está encendida o no
         */
        e.preventDefault(); //cancelar el comportamiento generico del formulario o sea que no refresque la página
        let url = editar === false ? 'php/task-add.php' : 'php/task-edit.php';

        /*
        $.ajax({
            url: 'php/task-add.php', 
            type: 'POST', 
            data: {postData: postData}, 
            success: function(response){    
                console.log(response);
            }
        });*/

        /***
        PODEMOS USAR UNA FUNCIÓN SIMILAR A LA DEL EVENTO DE BUSCAR COMO LA ANTERIOR
        PERO SE IMPLEMENTARÁ OTRA FORMA RESUMIDA QUE PERMITE jQUERY
        ESTO CON FINES DE PRACTICAR
        ****/

        
        $.post(url, postData, function(response){
            console.log(response);
            fetchTasks();
            $('#task-form').trigger('reset');
        });
        

    });

    /**OBTENER LOS DATOS DE LA BD PARA MOSTRARLAS EN LA TABLA */
    function fetchTasks(){
        $.ajax({
            url: 'php/task-list.php',
            type: 'GET',
            success: function(response) {
                let tasks = JSON.parse(response);
                
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a style="text-decoration:none; color:white;" href="#" class="task-item">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                Delete
                                </button>
                            </td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
                
    
            }
        });
    }

    /**Esperar el evento click de elementos con clase task-delete
     *  esto es para borrar las tareas
     */
    $(document).on('click', '.task-delete', function () {

        if(confirm('¿Está seguro que desea eliminar?')){
            //subimos dos veces al padre para poder acceder a la fila donde está el botón
            //y asi sacar su ID
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('php/task-delete.php', {id}, function(response){
            fetchTasks();
            })
        }
    
    });


    /**ESCUCHAR EL EVENTO DE EDITAR
     * VAMOS A CAPTURAR LA INFORMACIÓN DE LA TAREA
     * MOSTRARLA EN EL FORMULARIO PARA ENVIAR
     * NO VAMOS A OTRAS PÁGINAS PORQUE ES PARA PRACTICAR AJAX
     */

    $(document).on('click', '.task-item', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('php/task-single.php', {id}, function(response){
            const task_response = JSON.parse(response);
            $('#name').val(task_response.name);
            $('#description').val(task_response.description);
            $('#taskId').val(task_response.id);
            editar = true;
        });//fin del post a task-single.php


    });//fin del evento click de editar

});