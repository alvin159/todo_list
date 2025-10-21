import React from "react";

function Info() {
  return (
    <div className="info">
      <h1>Todo List App</h1>
      <h4>Author: Alvin Wijaya</h4>

      <section>
        <h5>Overview</h5>
        <p>
          This is a simple Todo List application built with React for the frontend and Node.js/Express for the backend.
          It allows you to create, edit, complete, and delete todos, assign tags, reorder items with drag-and-drop,
          and customize the background color of the todo list.
        </p>
      </section>

      <section>
        <h5>Features</h5>
        <ul>
          <li>Create todos with a title and tags.</li>
          <li>Edit todos directly inline or via the top input fields.</li>
          <li>Mark todos as completed or undone.</li>
          <li>Delete todos.</li>
          <li>Search todos by title or tag.</li>
          <li>Sort todos by modification date.</li>
          <li>Reorder todos using drag-and-drop.</li>
          <li>Customize the main page background color in Settings.</li>
        </ul>
      </section>

      <section>
        <h5>Prerequisites</h5>
        <p>Make sure you have Node.js installed.</p>
        <ul>
          <li>Install frontend dependencies: <code>npm install</code></li>
          <li>Install backend dependencies: <code>npm install</code> in the backend folder</li>
        </ul>
      </section>

      <section>
        <h5>Running the App</h5>
        <p>
          <strong>Backend:</strong> Start the Express server from the backend folder:
          <code>node server.js</code> or <code>npm start</code> if you have a start script.
        </p>
        <p>
          <strong>Frontend:</strong> Start the React app from the frontend folder:
          <code>npm start</code>. The app will run on <code>http://localhost:3000</code>.
        </p>
      </section>

      <section>
        <h5>Notes</h5>
        <ul>
          <li>The top input fields are for adding new todos.</li>
          <li>You can edit todos inline by clicking the edit button next to each item.</li>
          <li>The background color set in Settings is saved on the server and persists on reload.</li>
        </ul>
      </section>
    </div>
  );
}

export default Info;
