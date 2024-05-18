# Task Management Application

The Task Management Application is a web-based platform that allows users to manage their tasks efficiently. Users can create, update, delete tasks, and also view their tasks in real-time using sockets. The application provides a simple and intuitive interface for managing tasks effectively.

## Features

- **User Authentication**: Users can create an account and log in to access their tasks securely.
- **Task CRUD Operations**: Users can perform Create, Read, Update, and Delete operations on their tasks.
- **Real-time Updates**: The application provides real-time updates using socket, allowing users to view changes to their tasks instantly.
- **Pagination**: Tasks are paginated to improve performance and user experience, with options to customize the number of tasks per page and navigate through pages.
- **Task Filtering**: Users can filter their tasks based on completion status to focus on specific tasks.

## Technologies Used

- **Backend**: The backend of the application is built using Node.js, Express.js, and TypeScript, providing a robust and scalable server-side architecture. MongoDB is used as the database to store user and task data.
- **Authentication**: User authentication is implemented using JSON Web Tokens (JWT) to ensure secure access to user-specific data and endpoints.
- **Web Sockets**: Socket.io is used to enable real-time communication between the server and clients, allowing for instant updates to tasks.
- **Pagination**: Pagination of tasks is implemented on the server-side to efficiently handle large datasets and improve performance.

## Getting Started

To run the Task Management Application locally, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Nwafor6/tasks.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies for both the frontend and backend:

   ```bash
   cd tasks
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env` file in the `backend` directory and configure environment variables such as database connection URI, JWT secret, etc. Here's an example of the `.env` content:

   ```bash
   # MongoDB Connection URI
   MONGO_URL="mongodb://0.0.0.0:27017/tasks"

   # Server Port
   PORT=8000

   # JWT Secret Key
   TOKEN_KEY="STRING"

   # Project Environment
   PROJ_ENV="DEV"

   # Node Environment
   NODE_ENV="DEV"

   # Token Secret
   TOKEN_SECRET="STRING"

   ```

4. **Start the Server**: Start the backend server by running the following command:

   ```bash
   cd tasks && npm start
   ```

5. **Access the Application**: Once both the backend and frontend servers are running, you can access the application in your web browser at `http://localhost:8000`.

## Additional Notes

- The application's backend is hosted on [Render](https://render.com/).
- BASE_URL = "https://nwafor-glory-tasks.onrender.com"
- SOCKET_URL = "https://nwafor-glory-tasks.onrender.com"
- Compelete API DOC = "https://documenter.getpostman.com/view/33072617/2sA3JT3eGA"
- Clients should listen for the `"RECIEVE_TASK"` event via Socket.io to receive real-time updates on tasks.
