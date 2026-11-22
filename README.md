Mini Task Manager

A full-stack task management application built with Angular 22, ASP.NET Core Web API, and SQL Server.

Project Overview

Mini Task Manager is a web application designed to help users organize, manage, and track their daily tasks through a simple and user-friendly interface.

The application uses Angular for the frontend and ASP.NET Core Web API for backend services, with SQL Server for data persistence.

Technologies Used

Frontend

* Angular 22
* TypeScript
* HTML5
* CSS3

Backend

* C#
* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Swagger

Features

* Create new tasks.
* View all tasks.
* Edit existing tasks.
* Delete tasks.
* Mark tasks as completed or pending.
* Search tasks by title or description.
* Filter tasks by completion status.
* Display task statistics.
* Arabic right-to-left (RTL) user interface.
* Persistent data storage using SQL Server.

Project Structure

Mini-Task-Manager/
│
├── TaskManager.API/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   └── Program.cs
│
├── taskmanager-ui/
│   ├── src/
│   │   └── app/
│   │       └── services/
│   ├── angular.json
│   └── package.json
│
├── TaskManager.slnx
└── README.md

Getting Started

Prerequisites

* .NET SDK
* Node.js and npm
* SQL Server LocalDB
* Angular CLI

1. Clone the Repository

git clone https://github.com/Ammar-Alnadi/Mini-Task-Manger.git
cd Mini-Task-Manger

2. Run the Backend

dotnet run --project ./TaskManager.API/TaskManager.API.csproj --launch-profile https

Backend API:

https://localhost:7062

Swagger documentation:

https://localhost:7062/swagger

3. Run the Frontend

Open another terminal:

cd taskmanager-ui
npm install
ng serve

Open the application:

http://localhost:4200

Database

The application uses SQL Server LocalDB with Entity Framework Core to manage and persist task data.

Make sure the database connection string is configured correctly in the backend settings.

Developer
## Application Screenshot

![TaskFlow Dashboard](screenshots/Screenshot%202026-11-22%20181946.png)
Ammar Alnadi

GitHub: Ammar-Alnadi

⸻

Developed as a Full Stack project using Angular and ASP.NET Core.
