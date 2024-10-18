

const list = document.querySelector("ul");
list.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        updateLocalStorage();
    }
}, false);


function newElement() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        return;
    }

    const li = document.createElement("li");
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    addCloseButton(li);

    saveList();
}


document.addEventListener("DOMContentLoaded", () => {
    loadList();
});


function saveList() {
    const items = [];
    const listItems = document.querySelectorAll("#myUL li");
    listItems.forEach(item => {
        items.push({
            text: item.textContent.replace("\u00D7", ''),
            checked: item.classList.contains("checked")
        });
    });
    localStorage.setItem("taskList", JSON.stringify(items));
}


function loadList() {
    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        document.getElementById("myUL").appendChild(li);
        addCloseButton(li);
        if (task.checked) {
            li.classList.add("checked");
        }
    });
}

function removeItem(value) {
    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    const updatedTasks = tasks.filter(task => task.text !== value);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
}


function addCloseButton(li) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";

        removeItem(div.firstChild.nodeValue);
        div.remove();
    }
}

function updateLocalStorage() {
    const listItems = document.querySelectorAll("ul li");
    const checkedItems = [];

    listItems.forEach(item => {
        checkedItems.push({
            text: item.textContent.replace("\u00D7", ''),
            checked: item.classList.contains("checked")
        });
    });

    localStorage.setItem("taskList", JSON.stringify(checkedItems));
}