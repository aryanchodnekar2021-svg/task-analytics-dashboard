# task-analytics-dashboard
A responsive, glassmorphism-styled task management dashboard featuring real-time analytics, velocity charts, and an interactive activity calendar. Built with Vanilla JS and Chart.js.
# 📊 Enterprise Task Board

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/tech-HTML%20%7C%20CSS%20%7C%20JS-orange)
![Style](https://img.shields.io/badge/style-Glassmorphism-purple)

> A high-performance, responsive task management dashboard featuring real-time analytics, an interactive activity calendar, and a dynamic theme engine using CSS variables.

![Dashboard Preview]<img width="1919" height="992" alt="image" src="https://github.com/user-attachments/assets/6b3e377c-c2be-43d2-b1d8-28aa3837d0f8" />



## 📖 Overview

The **Enterprise Task Board** is a modern productivity tool built with **Vanilla JavaScript**. It moves beyond simple "To-Do" lists by integrating data visualization to track user velocity and completion rates. 

The UI is designed using the **Glassmorphism** aesthetic, featuring frosted glass panels (`backdrop-filter`), dynamic gradients, and a fully functional Dark/Light mode toggle that respects user preference.

## ✨ Key Features

### 🎨 UI & UX Design
* **Glassmorphism Interface:** Modern, translucent card design with soft shadows and borders.
* **Dynamic Theme Engine:** Real-time color picker that updates the entire application (charts, borders, glows) instantly using CSS Variables.
* **Dark Mode Support:** Fully responsive dark mode with adjusted contrast ratios and gradient shifts.

### 📈 Analytics & Visualization
* **Weekly Velocity (Line Chart):** Tracks task completion over the last 7 days to measure productivity trends.
* **Completion Rate (Doughnut Chart):** Visualizes the ratio of pending vs. completed tasks.
* **Activity Calendar:** A custom-built monthly calendar that visualizes activity frequency with status dots.

### ⚡ Core Functionality
* **CRUD Operations:** Add, read, update (toggle status), and delete tasks.
* **Local Persistence:** All data (tasks, theme color, dark mode preference) is saved to `localStorage`, ensuring data remains after page refreshes.
* **Smart Inputs:** Press "Enter" to add tasks; hover effects for deletion.

## 🛠️ Technical Stack

* **Frontend:** HTML5, CSS3 (Grid/Flexbox, Custom Properties)
* **Logic:** Vanilla JavaScript (ES6+)
* **Libraries:** [Chart.js](https://www.chartjs.org/) (for data visualization)
* **Fonts:** Inter (Google Fonts)
* **Icons:** SVG Icons

## 🚀 Getting Started

Since this project relies on Vanilla JS and CDN links, no build step (npm/yarn) is required.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/enterprise-task-dashboard.git](https://github.com/your-username/enterprise-task-dashboard.git)

    ## 🔮 Future Improvements

* [ ] Drag and drop functionality for task reordering.
* [ ] Category tags for tasks (e.g., "Work", "Personal").
* [ ] Export data to CSV/JSON.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---```

2.  **Open the application**
    Simply open `index.html` in your modern web browser.

    *Note: For the best experience, use a local server (like Live Server in VS Code) to ensure no CORS issues with modules, though this project runs fine as a static file.*

## 📂 Project Structure
