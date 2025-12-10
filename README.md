InkBytr 🖋️
===========

**A production-grade, full-stack blogging ecosystem engineered for scalability and performance.**

* * *

📜 Description
--------------

InkBytr is a sophisticated content platform that goes beyond simple CRUD operations. It is architected to demonstrate a complete, secure, and modern web application workflow.

Unlike basic templates, InkBytr implements a strict **Model-View-Controller (MVC)** pattern on the backend and a **Flux-inspired** state architecture on the frontend. It is designed to handle real-world scenarios including secure authentication, strict data validation, protected API routes, and transactional email delivery.

⚙️ System Architecture & Workflow
---------------------------------

This project connects several powerful technologies into a cohesive workflow:

1.  **Client-Side Entry:** Users interact with a highly responsive UI built on **React 19** and **Radix UI**.
2.  **Data Validation Layer:** Before any data leaves the browser, it is rigorously validated using **Zod** schemas integrated with **React Hook Form**. This ensures only clean, type-safe data reaches the API.
3.  **State Management:** Application state (User Sessions, UI Themes, Post Data) is centralized in **Redux Toolkit**, preventing prop-drilling and ensuring predictable UI updates.
4.  **Secure API Transport:** **Axios** interceptors manage HTTP requests, attaching **JWT** tokens automatically to protected routes.
5.  **Backend Security Guard:** The Node.js server uses **Helmet** to set secure HTTP headers and **Express-Rate-Limit** to throttle abusive requests before they hit the controller logic.
6.  **Business Logic & Persistence:** Controllers process the data, interacting with **MongoDB** via **Mongoose** schemas to ensure database integrity.
7.  **External Services:** Asynchronous tasks, such as sending welcome emails or password resets, are offloaded to **SendGrid**.

✨ Key Features
--------------

* **Advanced Authentication:**
    * Stateless session management using **JSON Web Tokens (JWT)**.
    * Password security via **Bcrypt** hashing.
    * Secure "Forgot Password" flows via email.

* **Robust Frontend Engineering:**
    * **Redux Toolkit** for global state management.
    * **React Hook Form + Zod** for schema-based form validation.
    * **Tailwind CSS + Radix UI** for accessible, headless component design.
    * **Lucide React** for consistent iconography.

* **Production-Ready Backend:**
    * **API Security:** CORS configuration, Helmet headers, and Rate Limiting.
    * **Database:** Mongoose ODM with strict schema definitions.
    * **Testing:** Unit and integration testing setup with **Jest** and **Supertest**.
    * **Email:** Transactional email integration via **SendGrid**.

💻 Tech Stack
-------------

### Client (Frontend)

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

### Server (Backend)

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![SendGrid](https://img.shields.io/badge/SendGrid-1A82E2?style=for-the-badge&logo=twilio&logoColor=white)

🛠️ Installation
----------------

1.  **Clone the repository:**

        git clone https://github.com/YourUsername/inkbytr.git
        cd InkBytr

2.  **Backend Setup:**

        # Navigate to the server directory
        cd Server

        # Install dependencies
        npm install

    Create a `.env` file in the `Server/` folder and add the following:

        PORT=5000
        MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inkbytr
        JWT_SECRET=your_super_secret_key
        SENDGRID_API_KEY=SG.your_sendgrid_key

3.  **Frontend Setup:**

        # Navigate to the client directory
        cd ../Client

        # Install dependencies
        npm install

    Create a `.env` file in the `Client/` folder:

        VITE_API_URL=http://localhost:5000/api

🚀 Usage
--------

1.  **Run the Backend Server:**

        # From the /Server directory
        npm run dev

    The backend will be available at `http://localhost:5000`.

2.  **Run the Frontend Server:**

        # From the /Client directory
        npm run dev

    The frontend will be available at `http://localhost:5173`.

🤝 Contributing
---------------

Contributions are welcome! If you have suggestions for improvements, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

📄 License
----------

This project is licensed under the MIT License. See the `LICENSE` file for more information.