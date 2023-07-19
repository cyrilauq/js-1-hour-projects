const form = document.getElementById('add_to_do_form');
const btn = document.getElementById('add_to_do_btn');
const title = document.getElementById('title');
const description = document.getElementById('description');
const toDoDiv = document.getElementById('to_do_view');
const sortForm = document.getElementById('sort_form');
const selectSort = document.getElementById('select_sort');

const toDos = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    addToDo({
        title: title.value,
        description: description.value,
        date: new Date()
    });
});

sortForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let sortFunction = () => {};

    switch(selectSort.value) {
        case "dd":
            console.log('dd');
            sortFunction = (a1, a2) => a1.date.getTime() - a2.date.getTime();
            break;
        case "dc":
            console.log('dc');
            sortFunction = (a1, a2) => a2.date.getTime() - a1.date.getTime();
            break;
        case "ad":
            console.log('ad');            
            sortFunction = (a1, a2) => a1.title.localeCompare(a2.title);
            break;
        case "ac":
            console.log('ac');
            sortFunction = (a1, a2) => a2.title.localeCompare(a1.title);
            break;
    }

    toDos.sort(sortFunction);
    displayToDo();
});

function addToDo(toDo = {title: String, description: String, date: Date}) {
    toDos.push(toDo);
    toDoDiv.appendChild(computeToDo(toDo));
}

function computeToDo(toDo = {title: String, description: String, date: Date}) {
    const toDoRoot = document.createElement('div');
    const toDoTitle = document.createElement('h2');
    const toDoDescription = document.createElement('p');
    const toDoDate = document.createElement('p');

    toDoTitle.innerText = toDo.title;
    toDoDescription.innerHTML = `<span>Description</span>${toDo.description}`;
    toDoDate.innerHTML = `<span>Added date</span>${formatDate(toDo.date)}`;

    const tr = `<tr><td>${toDo.title}</td></tr>`

    toDoRoot.append(toDoTitle, toDoDescription, toDoDate);

    return toDoRoot;
}

function formatDate(date = Date) {
    return `${date.getDay()}/${date.getMonth()}/${date.getYear()} à ${date.getHours()}h${date.getMinutes()}`;
}

function displayToDo() {
    toDoDiv.innerHTML = "";
    toDos.forEach(toDo => toDoDiv.appendChild(computeToDo(toDo)));
}