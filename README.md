# TaskOS

A full-stack project and task management platform built using the MERN stack. TaskOS enables users to connect, collaborate, and manage tasks seamlessly with a modern UI and powerful features designed for productivity.

## 🌐 Live Demo

- **Frontend (Vercel):** [https://task-os-rho.vercel.app](https://task-os-rho.vercel.app)

> ⚠️ Note: Backend routes are protected — login is required for API interaction.

<img src="https://res.cloudinary.com/dcm0pdfet/image/upload/v1744834312/Screenshot_2025-04-17_013824_hp2zox.png" width="700px" />

## 🧠 Project Description

Developed and deployed a full-stack project and task management platform, TaskOS, using the MERN stack, featuring JWT-based authentication, dynamic kanban boards (via DnD Kit), real-time networking, advanced task scheduling, and a responsive, Tailwind-powered UI. Integrated Cloudinary for image storage and MongoDB for data persistence.

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login system with access & refresh token strategy.
- 🗂️ **Dynamic Kanban Boards** — Interactive drag-and-drop task management using DnD Kit.
- 🤝 **User Networking** — Connect with others and collaborate on shared projects.
- 🗓️ **Timeline Module** — Visual representation of tasks.
- 🧭 **Advanced Task Scheduling** — Prioritize and organize work efficiently.
- 👤 **User Profiles** — Personalized dashboards and editable profiles.
- 📱 **Fully Responsive UI** — Mobile-first design using Tailwind CSS.

## 📁 Project Structure

```
TaskOS/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── vite.config.js
│   └── index.html
├── server/
│   ├── config/
│   ├── controllers/
│   ├── dao/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── LICENSE
└── README.md
```

## 🛠️ Tech Stack

- **Frontend:** React, Axios, Tailwind CSS, DnD Kit
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT with Access & Refresh Tokens
- **Cloud Storage:** Cloudinary
- **Deployment:** Vercel (Frontend), Render (Backend)

## 🧑‍💻 Running Locally

```bash
# Clone the repo
git clone https://github.com/ankush24-7/TaskOS.git
cd TaskOS
```

```bash
# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install
```

```bash
# Start the backend (from /server directory)
npm run dev
```

```bash
# Start the frontend (from /client directory, in a new terminal)
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

<br>