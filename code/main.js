let todos = [];

todos = JSON.parse(localStorage.getItem('todoses'));

render();



function addtodo() {
    let title = document.getElementById("todo-picker").value;
    let time = document.getElementById("time-picker").value;
    let select = document.getElementById("select").value;
    createtodo(title, time, select);
}

function createtodo(title, time, select) {
    let id = select + ' ' + new Date().getTime();
    todos.push({
        title: title,
        time: time,
        id: id
    });
    console.log(todos);
    render();
}

function deletetodo(evt){
    let buttontodelete = evt.target;
    let idtodelete = buttontodelete.id;
    removetodo(idtodelete);    
}

function removetodo(idtodelete){
    for(let i = 0; i < todos.length; i++){
        if(idtodelete == todos[i].id){
            todos[i]={};
        }
    }
    render();
}

function nextday(){
    for(let i = 0; i < todos.length; i++){
        if(todos[i].id.startsWith('m')){
            todos[i].id = todos[i].id.replace('morgen', 'heute');
        }  
    }
    render();
}

function savetodos(){
    localStorage.setItem('todoses', JSON.stringify(todos));
}

function render() {
    document.getElementById('today').innerHTML = '';
    document.getElementById('tomorrow').innerHTML = '';
    document.getElementById('this-week').innerHTML = '';

    todos.sort(function (a, b){   //Funktion verstehen?
        if(a.time > b.time){
            return 1;
        } else if(a.time < b.time){
            return -1;
        } else {
            return 0;
        }
    });
    
    for(let i = 0; i < todos.length; i++)
    {   
        if(!todos[i].title){

        } else{
            let element = document.createElement('div');
            element.classList = "todosliste";
            let para = document.createElement('p');
            let para2 = document.createElement('p');
            para.innerText = todos[i].title;
            para.classList = "p";
            para2.innerText = todos[i].time;
            para2.classList = "p2";

            let button = document.createElement('button');
            button.innerText = "Erledigt";
            button.classList = "delete";
            button.id = todos[i].id;
            button.onclick = deletetodo;
            element.appendChild(para);
            element.appendChild(para2);
            element.appendChild(button);

            if(todos[i].id[0] == 'h'){
                document.getElementById('today').appendChild(element);
            } else if(todos[i].id[0] == 'm') {
                document.getElementById('tomorrow').appendChild(element);
            } else if(todos[i].id[0] == 't') {
                document.getElementById('this-week').appendChild(element);
            } 
        }
    }
    savetodos();
}

//Timer

