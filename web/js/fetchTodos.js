document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const todoListContainer = document.getElementById('myUL');
    const errorMessage = document.getElementById('error-message');

    const randomNum = Math.random();

    function togglePreloader(show) {
        preloader.style.display = show ? 'flex' : 'none';
    }

    function render(todos) {
        todos.forEach(todo=> {
            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.id}. ${todo.title}`;
            todoListContainer.appendChild(todoItem);
            if (todo.completed) {
                todoItem.classList.add("checked");
            }

            addCloseButton(todoItem);

            saveList();
        });
    }

    function fetchTodoList() {
        return new Promise((resolve, reject) => {


            let filterCondition = (todo) => true;

            if (randomNum < 0.5) {
                filterCondition = (todo) => todo.id <= 100;
            } else {
                filterCondition = (todo) => todo.id >= 100;
            }
            console.log(randomNum);
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(data => {
                    const filteredData = data.filter(filterCondition);
                    localStorage.setItem('todoList', JSON.stringify(filteredData));
                    resolve(filteredData);
                })
                .catch(error => reject(error));
        });
    }


    function loadTodoList() {
        togglePreloader(true);
        errorMessage.classList.add('hidden');

        fetchTodoList()
            .then(todos => {
                render(todos);
                togglePreloader(false);
            })
            .catch(error => {
                errorMessage.classList.remove('hidden');
                togglePreloader(false);
            });

    }

    loadTodoList();
});