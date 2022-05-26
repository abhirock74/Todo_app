var todyTaskUI = document.getElementById('todyTaskUI');
var completedTaskUI = document.getElementById('completedTaskUI');
var deletedTaskUI = document.getElementById('deletedTaskUI');
var input = `<input type="text" id="createTask" class="form-control" placeholder="ADD A NEW TASK">
            <button type="button" class="btn btn-info" onclick="save()">Save</button>`;
todyTaskUI.style.display = "block";
completedTaskUI.style.display = "none";
deletedTaskUI.style.display = "none";
document.getElementById("inputForm").innerHTML = input;
function todyTaskUiBox() {
    todyTaskUI.style.display = "block";
    completedTaskUI.style.display = "none";
    deletedTaskUI.style.display = "none";
};
function completedTaskUiBox() {
    completedTaskUI.style.display = "block";
    todyTaskUI.style.display = "none";
    deletedTaskUI.style.display = "none";
};
function deletedTaskUiBox() {
    deletedTaskUI.style.display = "block";
    todyTaskUI.style.display = "none";
completedTaskUI.style.display = "none";
};
todayTasks = [];
deletedTasks = [];
completedTasks = [];
tasksTable();
function getData() {
    let taskData = localStorage.getItem('todayTasks');
    let delData = localStorage.getItem('deletedTasks');
    let comData = localStorage.getItem('completedTasks');
    if (taskData) {
        todayTasks = JSON.parse(taskData);
    } else {
        setData();
    };
    if (delData) {
        deletedTasks = JSON.parse(delData);
    } else {
        setData();
    };
    if (comData) {
        completedTasks = JSON.parse(comData);
    } else {
        setData();
    };
};
function setData() {
    localStorage.setItem("todayTasks", JSON.stringify(todayTasks));
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
};

function tasksTable() {
    getData();
    let table = `<hr><table class="table">
  <thead>`
    for (let i = 0; i < todayTasks.length; i++){
        table = table+`<tr>
      <th class="col-9">${todayTasks[i]}</th>
      <th class="col-1"><button type="button" class="btn btn-primary" onclick="edit(${i})">EDIT</button></th>
      <th class="col-1"><button type="button" class="btn btn-danger" onclick="deleteTask(${i})">Delete</button></th>
      <th class="col-1"><button type="button" class="btn btn-success"onclick="complete(${i})">Complete</button></th>
    </tr>`
    };
    table = table +`</thead>
        </table>`;

    document.getElementById('task').innerHTML = table;
};
function save() {
    let tasks = document.getElementById('createTask');
    let createTasks = [tasks.value];
    // check if task is empty 
    if (tasks.value == "") {
        alert("EMPTY TASK CAN'T ADD");
        return
    };
    todayTasks.push(createTasks);
    setData();
    tasksTable();
    // console.log(todayTasks);
    tasks.value = "";
};
function deleteTask(index) {
    let deleteData = [todayTasks[index]];
    deletedTasks.push(deleteData);
    todayTasks.splice(index, 1);
    setData();
    tasksTable();
    deleteTable();
};
function edit(index) {
    let editForm = `<input type="text" id="updatedTask" value="${todayTasks[index]}" class="form-control" placeholder="UPDATE YOUR TASK">
            <button type="button" class="btn btn-info" onclick="update(${index})">Update</button>`
    document.getElementById("inputForm").innerHTML = editForm;
}
function update(index) {
    newTask = document.getElementById('updatedTask').value;
    //check if update tasks is empty
    if (newTask == "") {
        alert("EMPTY TASK CAN'T BE ADDED")
        return
    };
    todayTasks[index] = newTask;
    setData();
    tasksTable();
    document.getElementById("inputForm").innerHTML = input;
};
function complete(index) {
    let completeData = [todayTasks[index]];
    completedTasks.push(completeData);
    todayTasks.splice(index, 1);
    setData();
    tasksTable();
    completeTable(index);
    // console.log(completeData);
}
function deleteTable() {
    getData();
  let delTable = `<table class="table">
  <thead>`
    for (let i = 0; i < deletedTasks.length; i++){
        delTable = delTable+`<tr>
      <th class="col-2 bg-danger">${[i+1]}</th>
      <th class="col-10 bg-danger">${deletedTasks[i]}</th>
      <th class="col-10 bg-danger"><button type="button" class="btn btn-warning" onclick="removeDelete(${i})">Remove</button></th>
    </tr>`
    };
    delTable = delTable +`</thead>
        </table>`;

    document.getElementById('deletedData').innerHTML = delTable;
};
deleteTable(); // render previous deleted data on page load
function completeTable(index) {
    getData
    let completeTable = `<table class="table">
  <thead>`
    for (let i = 0; i < completedTasks.length; i++){
        completeTable = completeTable+`<tr>
      <th class="col-2 bg-success">${[i+1]}</th>
      <th class="col-10 bg-success">${completedTasks[i]}</th>
      <th class="col-10 bg-success"><button type="button" class="btn btn-danger" onclick="removeUpdate(${i})">Remove</button></th>
    </tr>`
    };
    completeTable = completeTable +`</thead>
        </table>`;
    document.getElementById('completeData').innerHTML = completeTable;
};
completeTable();// render previous deleted data on page load
function removeUpdate(index) {
    completedTasks.splice(index, 1);
    setData();
    completeTable();
    // console.log(removeData)
};
function removeDelete(index) {
    deletedTasks.splice(index, 1);
    setData();
    deleteTable()
    // console.log(index)
};