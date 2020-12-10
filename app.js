document.getElementById('tasksform').addEventListener('submit',saveTask);

//Atrapamos el evento e
//Para evitar, que la página se refresqué, xq usamos el evento submit
//usamos preventDefault()
function saveTask(e)
{   
    //console.log(e);
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;

    const task = {
        title,//title:title, es lo mismo, igual con desc
        desc
    }

    //Verificamos si tasks está vacío o ya se ha puesto tareas
    if (localStorage.getItem('dataTasks') === null) {
        let arrayTask = [];
        arrayTask.push(task);
        localStorage.setItem('dataTasks',JSON.stringify(arrayTask));
    } else {
        // Si ya hay datos, copiamos el arreglo y le gegamos la atrea
        //Luego lo pasamos a localStorage
        let backupTasks = JSON.parse(localStorage.getItem('dataTasks'));
        backupTasks.push(task);
        localStorage.setItem('dataTasks', JSON.stringify(backupTasks));
    }

    //Para que cada vez que se agregue una tarea se refresque la
    //lista de tareas
    getTasks();
    document.getElementById('tasksform').reset();
    //Almacenamos task con la clave dataTasks
    //Podemos ver los datos en la consola-Almacenamiento
    //Para almacenar los datos el objeto, en formato de string, 
    //se puede usar JSON.stringify
    //localStorage.setItem('dataTasks',JSON.stringify(task));

    //Para recuperar los datos del localStorage
    /*let recuperando = localStorage.getItem('dataTasks');
    JSON.parse para volver los datos en un obj
    console.log(JSON.parse(recuperando));
    */
    e.preventDefault();
}

//Este método lo usaremos para desplegar nuestras tareas
//en la interfaz cada e¿vez que se agregue una

function getTasks()
{
    let tasksforGUI = JSON.parse(localStorage.getItem('dataTasks'));
    let taskView = document.getElementById('tasks');

    //Lo vacíamos, en caso de que hayan tareas
    taskView.innerHTML = '';

    if (tasksforGUI != null) {
        for (let index = 0; index < tasksforGUI.length; index++) {
            //console.log(tasksforGUI[i]);
            let title = tasksforGUI[index].title;
            let description = tasksforGUI[index].desc;
            taskView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
            <p>${title} - ${description}</p>
            <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
            </div>`;
        }
    }

}

function deleteTask(titleTask)
{
    //console.log(titleTask);

    let tasks = JSON.parse(localStorage.getItem('dataTasks'));

    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].title == titleTask) {
            tasks.splice(index,1);
        }
    localStorage.setItem('dataTasks',JSON.stringify(tasks));
    getTasks();        
    }
}
getTasks();