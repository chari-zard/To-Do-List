const add = document.getElementById("addTaskBtn");
const tasklist = document.getElementById("taskList");

showTask();

add.addEventListener('click', function() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() != '') {

        addTaskToDOM(taskInput, false);
        saveData(); 
        document.getElementById("taskInput").value = ''; 
    }
});

function addTaskToDOM(task, completed) {
    let list = document.createElement("li");
    list.className = "flex items-center w-full justify-between mb-2";
    list.innerHTML = `
        <div class="flex items-center">
            <input type="checkbox" class="h-6 w-6 border-gray-300 rounded-full" ${completed ? 'checked' : ''}>
            <div class="ml-3 text-gray-800 ${completed ? 'line-through' : ''}">${task}</div>
        </div>
        <div class="p-[5px] max-w-[40px] rounded-full cursor-pointer hover:bg-slate-200">
            &#x2716;
        </div>
    `;

    tasklist.appendChild(list);

    const checkbox = list.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        const taskText = list.querySelector('.text-gray-800');

        if (checkbox.checked) {
            taskText.classList.add('line-through');
        } 
            else{
            taskText.classList.remove('line-through'); 
        }
        saveData();
    });

    list.querySelector('.cursor-pointer').addEventListener('click', function() {
        list.remove();
        saveData(); 
    });
}

function saveData() {
    const tasks = [];
    const taskElements = document.querySelectorAll("#taskList li");
    taskElements.forEach(item => {
        const text = item.querySelector('.text-gray-800').innerText;
        const completed = item.querySelector('input[type="checkbox"]').checked;
        tasks.push(`${completed},${text}`); // Save as comma-separated values
    });
    localStorage.setItem("Data", tasks.join('|')); // Use pipe as separator
}

function showTask() {
    const tasks = localStorage.getItem("Data") ? localStorage.getItem("Data").split('|') : []; // Split on pipe
    tasks.forEach(taskData => {
        const [completed, text] = taskData.split(','); // Split on comma
        addTaskToDOM(text, completed === 'true'); // Re-add each task to the DOM
    });
}