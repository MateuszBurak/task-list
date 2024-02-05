{
    const tasks = [
        {
            content: "zrobić zadanie domowe",
            done: false,
        },
        {
            content: "iść już spać Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, voluptate? Omnis, impedit! Officiis amet id delectus nisi animi velit in quidem corrupti reiciendis, ad autem eum est dolores, consectetur voluptate?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi assumenda earum doloribus culpa illum voluptate cupiditate, fuga, voluptatum aspernatur rerum corporis optio amet accusamus? Placeat laudantium explicabo ipsa veniam distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem delectus repudiandae aliquid, officia corrupti necessitatibus, fugit similique illum molestiae vero hic quis accusamus sapiente unde qui tempore cumque saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nobis laudantium eaque tenetur? Nesciunt corporis eum commodi quisquam recusandae, cupiditate, esse, consequatur odio veritatis quos iste libero ullam voluptatibus consectetur.",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="taskList__listItem">
                <button class="taskList__buttonDone">✔</button>
                    <div class=\"taskList__listItemContent ${task.done ? "taskList__listItemContent--done" : ""}">${task.content}</div>
                <button class="taskList__buttonDeleteTask">🗑</button>
            </li>
            `;
        };

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            tasks.push({
                content: newTaskContent,
            });

            render();
        });
    };

    init();
}