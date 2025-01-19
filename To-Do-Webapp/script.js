// Retrieve tasks from localStorage on page load, or initialize if not found
let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();

    if (taskTitle && taskDescription) {
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            addedAt: new Date().toLocaleString(),
            completed: false
        };
        pendingTasks.push(newTask);
        document.getElementById('taskTitle').value = '';  // Clear input fields
        document.getElementById('taskDescription').value = '';
        saveTasks();  // Save tasks to localStorage
        renderTasks();
    }
}

function markAsCompleted(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const completedTask = { ...pendingTasks[taskIndex], completed: true };
        completedTask.completedAt = new Date().toLocaleString();
        completedTasks.push(completedTask);
        pendingTasks.splice(taskIndex, 1);
        saveTasks();  // Save tasks to localStorage
        renderTasks();
    }
}

function deleteTask(taskId, taskType) {
    if (taskType === 'pending') {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    } else {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    }
    saveTasks();  // Save tasks to localStorage
    renderTasks();
}

function editTask(taskId, taskType) {
    const newTaskTitle = prompt("Edit task title:");
    const newTaskDescription = prompt("Edit task description:");
    if (newTaskDescription || newTaskTitle) {
        if (taskType === 'pending') {
            const task = pendingTasks.find(task => task.id === taskId);
            task.description = newTaskDescription;
            task.title = newTaskTitle;
        } else {
            const task = completedTasks.find(task => task.id === taskId);
            task.description = newTaskDescription;
            task.title = newTaskTitle;
        }
        saveTasks();  // Save tasks to localStorage
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-100', 'p-4', 'rounded-lg', 'shadow-sm');
        taskElement.innerHTML = `
            <div>
                <p class="text-lg text-gray-800">${task.title}</p>
                <p class="text-sm text-gray-500">${task.description}</p>
                <span class="text-sm text-gray-500">${task.addedAt}</span>
            </div>
            <div class="flex space-x-2">
                <button onclick="editTask(${task.id}, 'pending')" 
                    class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">Edit</button>
                <button onclick="deleteTask(${task.id}, 'pending')" 
                    class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200">Delete</button>
                <button onclick="markAsCompleted(${task.id})" 
                    class="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200">Complete</button>
            </div>
        `;
        pendingTasksList.appendChild(taskElement);
    });

    completedTasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('flex', 'justify-between', 'items-center', 'bg-green-100', 'p-4', 'rounded-lg', 'shadow-sm');
        taskElement.innerHTML = `
            <div>
                <p class="text-lg text-gray-800 line-through">${task.title}</p>
                <p class="text-sm text-gray-500">${task.description}</p>
                <span class="text-sm text-gray-500">${task.addedAt}</span><br>
                <span class="text-sm text-gray-500">Completed at: ${task.completedAt}</span>
            </div>
            <div class="flex space-x-2">
                <button onclick="editTask(${task.id}, 'completed')" 
                    class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">Edit</button>
                <button onclick="deleteTask(${task.id}, 'completed')" 
                    class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(taskElement);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', renderTasks);
