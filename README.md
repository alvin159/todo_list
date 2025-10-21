# Todo List App

A simple Todo List web application built with **JavaScript**, using **React** for the frontend and **Node.js / Express / MongoDB** for the backend.

---

## Features

- Add new todos with **Title** and **Tags**.
- Edit todos **inline** directly in the list.
- Mark todos as **Completed** or **Undone**.
- Delete todos.
- Drag-and-drop to reorder todos.
- Filter todos by title, tags, and status (All, Completed, Undone).
- Change the **background color** of the Todo page via Settings (persisted across sessions).
- Responsive UI for desktop and mobile.

---

## Prerequisites

- Docker & Docker Compose installed
- Node.js (for running the frontend locally)

### Required Packages

- axios
- react-color
- react-router-dom
- @hello-pangea/dnd
- moment
- json-server (for mock backend)

---

## Setup Instructions

### 1. Start Backend and Database with Docker

Run the backend (Express) and MongoDB using Docker Compose:

```bash
docker compose up --build backend mongo
```
This will:
- Build and run the backend on http://localhost:3010
- Start MongoDB in a container
- Use the shared Docker network (todo-net)

### 2. Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm start
```
Then open http://localhost:3000 in your browser.
Your React app will automatically connect to the backend via http://localhost:3010

### Usage
- Add todos using the top input bar.
- Edit todos inline by clicking the Edit button.
- Toggle completion using the Complete/Undo button.
- Drag-and-drop todos to reorder.
- Filter using search inputs and status dropdown.
- Change background color in the Settings page.

### Author
## Alvin Wijaya
