document.getElementById('tasksform').addEventListener('submit',saveTask);
function saveTask(e)
{   
    //console.log(e);
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;

    const task = {
        title,//title:title, es lo mismo, igual con desc
        desc
    }


    if (localStorage.getItem('dataTasks') === null) {
        let arrayTask = [];
        arrayTask.push(task);
        localStorage.setItem('dataTasks',JSON.stringify(arrayTask));
    } else {

        let backupTasks = JSON.parse(localStorage.getItem('dataTasks'));
        backupTasks.push(task);
        localStorage.setItem('dataTasks', JSON.stringify(backupTasks));
    }


    getTasks();
    document.getElementById('tasksform').reset();

    e.preventDefault();
}



function getTasks()
{
    let tasksforGUI = JSON.parse(localStorage.getItem('dataTasks'));
    let taskView = document.getElementById('tasks');

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
