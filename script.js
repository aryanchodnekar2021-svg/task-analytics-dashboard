// --- STATE MANAGEMENT ---
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let chartInstanceLine = null;
let chartInstancePie = null;

// Initialization Variables
const savedColor = localStorage.getItem("themeColor") || "#4f46e5";
const savedMode = localStorage.getItem("darkMode") === "true";
let currentCalendarDate = new Date(); // Calendar State

// Apply defaults immediately
document.documentElement.style.setProperty('--primary', savedColor);
document.documentElement.style.setProperty('--primary-glow', savedColor + '66');
document.getElementById("themeColor").value = savedColor;

if(savedMode) {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeToggle").checked = true;
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateCharts();
    renderCalendar(); // Initial render of calendar
});

// Theme Color Listener
document.getElementById("themeColor").addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--primary-glow', color + '66');
    localStorage.setItem("themeColor", color);
    updateCharts();
    renderCalendar(); // Re-render to update dot colors if needed
});

// Dark Mode Listener
document.getElementById("darkModeToggle").addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", e.target.checked);
    updateCharts(); // Needed to update chart text colors
});

// Enter Key Listener
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// Calendar Navigation Listeners
document.getElementById("prevMonth").addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
});

// --- CORE FUNCTIONS ---
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        // Store date as YYYY-MM-DD for easier comparison
        date: new Date().toISOString().split('T')[0]
    };

    tasks.unshift(newTask);
    saveAndRender();
    input.value = "";
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveAndRender();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateCharts();
    renderCalendar(); // Update calendar dots when tasks change
}

function renderTasks() {
    const ul = document.getElementById("taskList");
    ul.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${task.id})">
                <div class="check-circle"></div>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        ul.appendChild(li);
    });
}

// --- CHART LOGIC ---
function updateCharts() {
    // Get current styles for chart colors
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#94a3b8' : '#6b7280';
    const gridColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    // --- Prepare Data ---
    // Line Chart Data (Last 7 Days)
    const labels = [];
    const lineData = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
        
        // Count tasks completed on this specific date
        const count = tasks.filter(t => t.completed && t.date === dateStr).length;
        lineData.push(count);
    }

    // Pie Chart Data
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    // --- Render Line Chart ---
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    if (chartInstanceLine) chartInstanceLine.destroy();

    chartInstanceLine = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Completed',
                data: lineData,
                borderColor: primaryColor,
                backgroundColor: primaryColor + '20', // Add transparency
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: primaryColor,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: textColor }, grid: { display: false } },
                y: { beginAtZero: true, ticks: { stepSize: 1, color: textColor }, grid: { color: gridColor } }
            }
        }
    });

    // --- Render Pie Chart ---
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    if (chartInstancePie) chartInstancePie.destroy();

    chartInstancePie = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Done', 'Pending'],
            datasets: [{
                data: [completedCount, pendingCount],
                backgroundColor: [primaryColor, isDarkMode ? '#334155' : '#e5e7eb'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '75%',
            plugins: { 
                legend: { position: 'bottom', labels: { color: textColor, usePointStyle: true, padding: 20 } } 
            }
        }
    });
}

// --- CALENDAR LOGIC ---
function renderCalendar() {
    const grid = document.getElementById("calendarGrid");
    const monthDisplay = document.getElementById("monthYearDisplay");
    
    grid.innerHTML = "";
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Set Header
    monthDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Calculate Days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty slots for previous month
    for (let i = 0; i < firstDayIndex; i++) {
        const div = document.createElement("div");
        div.classList.add("calendar-day", "empty");
        grid.appendChild(div);
    }
    
    // Days of current month
    const today = new Date();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement("div");
        div.classList.add("calendar-day");
        div.textContent = i;
        
        // Format date string to match task storage (YYYY-MM-DD)
        const currentMonthStr = (month + 1).toString().padStart(2, '0');
        const currentDayStr = i.toString().padStart(2, '0');
        const dateString = `${year}-${currentMonthStr}-${currentDayStr}`;
        
        // Highlight Today
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            div.classList.add("today");
        }
        
        // Check for tasks on this date
        const dayTasks = tasks.filter(t => t.date === dateString);
        
        if (dayTasks.length > 0) {
            const dotContainer = document.createElement("div");
            dotContainer.classList.add("dot-container");
            
            // Limit dots to 3 to prevent overflow
            dayTasks.slice(0, 3).forEach(task => {
                const dot = document.createElement("div");
                dot.classList.add("dot");
                if (task.completed) dot.classList.add("completed");
                dotContainer.appendChild(dot);
            });
            
            div.appendChild(dotContainer);
        }
        
        grid.appendChild(div);
    }
}