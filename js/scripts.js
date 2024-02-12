{
    let tasks = [];
    let hideDoneTasks = false;

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

        tasks = tasks.filter((task, index) => index != taskIndex);

        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = tasks.map((task, index) => taskIndex === index ? { ...task, done: !task.done } : task);

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

    const hideShowDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
    }

    const markAllAsDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }))
    }

    const bindButtonEvents = () => {

        const hideDoneTasksButtonElement = document.querySelector(".js-hideDoneTasksButton");
        const markAsDoneButtonElement = document.querySelector(".js-markAsDoneButton");

        if (hideDoneTasksButtonElement) {
            hideDoneTasksButtonElement.addEventListener("click", () => {
                hideShowDoneTasks();

                render();
            });

        };

        if (markAsDoneButtonElement) {
            markAsDoneButtonElement.addEventListener("click", () => {
                markAllAsDone();

                render();
            });
        };
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class= ${(task.done && hideDoneTasks) ? "taskList__listItem--hidden" : "taskList__listItem"}>
            <button class="taskList__buttonDone js-done">✔</button>
                <div class=\"taskList__listItemContent ${task.done ? "taskList__listItemContent--done" : ""}">${task.content}</div>
            <button class="taskList__buttonDeleteTask js-remove">🗑</button>
        </li>
        `;
        };

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const listButtonsElement = document.querySelector(".js-listButtons");

        if (!tasks.length) {
            listButtonsElement.innerHTML = "";
            return;
        }

        listButtonsElement.innerHTML = `
        <button class="taskList__listButton js-hideDoneTasksButton" >
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="taskList__listButton js-markAsDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
        </button>
        `
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