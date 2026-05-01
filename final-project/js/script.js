// --- Task Data ---
let tasks = [];
const createTaskBtn = document.getElementById("createTaskBtn");
const taskMenu = document.getElementById("task-menu");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const navButton = document.getElementById("topbar");
const navMenu = document.getElementById("nav-menu");



// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task
function addTask(text) {
  const task = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    archived: false,   // NEW FIELD
    createdAt: Date.now()
  };

  tasks.push(task);
  saveTasks();
}

// Mark complete
function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = true;
  saveTasks();
}

// Archive (remove from board but keep in history)
function archiveTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.archived = true;
  saveTasks();
}

// Render sticky notes
const board = document.getElementById("board");
if(board) {
  function renderBoard(taskList) {
  
    board.innerHTML = "";

    taskList
      .filter(task => !task.archived) // HIDE archived tasks
      .forEach(task => {
        const note = document.createElement("div");
        note.className = "sticky-note";
        note.style.transform = `rotate(${(Math.random() * 10 - 5)}deg)`;

        if (task.completed) note.classList.add("completed");

        note.textContent = task.text;

        // Double-click to archive
        note.addEventListener("dblclick", () => {
          archiveTask(task.id);
          renderBoard(tasks);
        });

        board.appendChild(note);
      });
  }

}

// --- Add Task Button ---
/*addTaskBtn.addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  addTask(text);
  renderBoard(tasks);
  input.value = "";
});*/

function clearAllTasks() {
  tasks = [];
  saveTasks();
  renderBoard(tasks);
}

//make nav-menu visible



function showMenu() {
  navMenu.classList.add("visible");
}

function hideMenu() {
  navMenu.classList.remove("visible");
}

navButton.addEventListener("mouseenter", showMenu);
navButton.addEventListener("mouseleave", hideMenu);

navMenu.addEventListener("mouseenter", showMenu);
navMenu.addEventListener("mouseleave", hideMenu);

//task menu visible

// --- Task Menu Toggle ---

function toggleTaskMenu() {
  taskMenu.classList.toggle("visible");
}

if(createTaskBtn) {
  createTaskBtn.addEventListener("click", toggleTaskMenu);
}


if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    addTask(text);
    renderBoard(tasks);
    taskInput.value = "";

    taskMenu.classList.remove("visible");
  });
}

// Load tasks on page load
window.onload = () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if(board) {
    renderBoard(tasks);
  }
  
};


