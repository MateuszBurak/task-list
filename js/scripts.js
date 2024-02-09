{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            }
        ]

        render();
    };

    const removeTask = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindButtonEvents = () => {

    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskList__listItem">
            <button class="taskList__buttonDone js-done">✔</button>
                <div class=\"taskList__listItemContent ${task.done ? "taskList__listItemContent--done" : ""}">${task.content}</div>
            <button class="taskList__buttonDeleteTask js-remove">🗑</button>
        </li>
        `;
        };

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => {

    };


    const render = () => {

        renderTasks();
        renderButtons();

        bindButtonEvents();
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskField = document.getElementById("newTaskField");

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTaskField.value = "";
        newTaskField.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};