// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(), // Unique ID for each task
        text: taskText,
        completed: false
    };

    // Get existing tasks from localStorage
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear the input and reload the task list
    taskInput.value = '';
    loadTasks();
}

// Function to load tasks from localStorage and display them
function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list

    const tasks = getTasks();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to get tasks from localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to toggle a task's completion status
function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Function to delete a task
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}