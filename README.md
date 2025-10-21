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

- Node.js installed
- npm or yarn package manager

### Required Packages

- axios
- react-color
- react-router-dom
- @hello-pangea/dnd
- moment
- json-server (for mock backend)

---

## Setup Instructions

### 1. Backend

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Create a .env file with the following content:
```bash
PORT=3010
MONGODB_URI=your_mongodb_connection_string
```

3. Install dependencies:
```bash
Copy code
npm install
```

4. Start the server:
```bash
node server.js
Your backend will run at http://localhost:3010.
```

### 2. Frontend
1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with the API URL:
```bash
REACT_APP_API_URL=http://localhost:3010
```

4. Start the React app:
```bash
npm start
```

Open your browser at http://localhost:3000.

### Usage
- Add todos using the top input bar.
- Edit todos inline by clicking the Edit button.
- Toggle completion using the Complete/Undo button.
- Drag-and-drop todos to reorder.
- Filter using search inputs and status dropdown.
- Change background color in the Settings page.

### Author
## Alvin Wijaya
