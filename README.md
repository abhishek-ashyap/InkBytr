# InkBytr 🖋️

**A production-grade, secure, and scalable full-stack blogging ecosystem.**

[**Live Demo**](https://ink-bytr.vercel.app/)

---

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📜 Description

**InkBytr** is a production-grade, full-stack blogging ecosystem engineered for security, scalability, and performance. It bridges a high-performance **React 19** frontend with a hardened **Node.js** backend.

Unlike basic CRUD applications, InkBytr implements industrial-grade security practices including **Rate Limiting**, **Helmet header protection**, **RBAC (Role-Based Access Control)**, and **Crypto-based verification tokens**. It is designed to handle real-world scenarios such as email verification, password resets, and protected API communication.

## 🔧 Technical Architecture & Deep Dive

InkBytr is built with a focus on **security**, **modularity**, and **type safety**. Below is a breakdown of the architectural decisions implemented in the codebase.

### 🔐 Security & Authentication Layer
The application implements a multi-layered security approach:
* **Rate Limiting:** To prevent brute-force attacks and DDoS, the backend implements `express-rate-limit`.
    * **Login Limiter:** Blocks requests after 10 failed attempts per 15 minutes.
    * **Registration Limiter:** Caps account creation requests to 20 per minute.
* **Crypto-Based Verification:** Instead of relying solely on JWTs for email actions, the system uses Node.js native `crypto` module to generate random 32-byte hex tokens hashed with `SHA-256` for:
    * Email Verification (`verificationToken`)
    * Password Resets (`passwordResetToken`)
* **RBAC (Role-Based Access Control):** Custom middleware (`adminAuth.js`) ensures that critical deletion operations are strictly protected against unauthorized users.
* **Helmet:** Secure HTTP headers are enforced to mitigate XSS and clickjacking attacks.

### ⚡ Client-Side State & Performance
The Frontend is not just a view layer; it manages complex state logic:
* **Redux Toolkit (RTK) & Thunks:** Global state is managed via `authSlice` and `postSlice`.
* **Optimistic UI patterns** are prepared in the structure to allow immediate UI feedback.
* **JWT Decoding:** The client proactively checks token expiration (`jwt-decode`) before making requests to prevent unnecessary API calls.
* **Axios Interceptors:** A centralized API service (`Client/src/services/api.js`) automatically attaches the `Bearer` token to every outgoing request, ensuring seamless authentication state across the app.
* **Component Architecture:** Built on **Shadcn UI** (Radix UI primitives), ensuring the app is fully accessible (WAI-ARIA compliant) and easily themable via Tailwind CSS variables.

### 🗄️ Database & Data Modeling
MongoDB is utilized with advanced Mongoose patterns:
* **Hybrid Schema Design:**
    * **Referencing:** `User` and `Post` are decoupled using `ObjectId` references to ensure scalability.
    * **Embedding:** `Comments` are embedded directly within the `Post` document for faster read performance (Data Locality), reducing the need for expensive `$lookup` aggregations during feed rendering.
* **Virtuals & Methods:** Custom instance methods like `createPasswordResetToken` encapsulate business logic directly within the Data Model, keeping Controllers clean.

### 🛡️ Form Validation Pipeline
Data integrity is enforced at both the entry and exit points:
1.  **Frontend:** `Zod` schemas validate input shapes in real-time within `React Hook Form`.
2.  **Backend:** Mongoose schemas enforce strict typing and `required` fields before database insertion.

## ✨ Key Features

* **Advanced Auth Flow:** Registration, Login, Email Verification, and "Forgot Password" functionality using SendGrid.
* **Interactive Content:** Users can Create, Read, Update, and Delete (CRUD) posts.
* **Social Features:** Real-time Like/Unlike system and Commenting system.
* **Admin Privileges:** Admins can moderate content by deleting any post or comment.
* **Responsive Design:** Fully responsive UI built with Tailwind CSS and Lucide React icons.
* **Loading States:** Polished UX with Skeleton loaders during data fetching.

## 💻 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Shadcn/UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

## 📂 Project Structure

```text
InkBytr/
├── Client/              # React 19 Frontend
│   ├── src/
│   │   ├── app/         # Redux Store & Slices
│   │   ├── components/  # Shadcn UI Components
│   │   ├── pages/       # Route Views
│   │   └── services/    # Axios & API Logic
├── Server/              # Node.js Backend
│   ├── controllers/     # Auth & Post Logic
│   ├── middleware/      # Rate Limits & Auth Checks
│   ├── models/          # Mongoose Schemas
│   └── utils/           # Email & Hashing Utils
```

## 🛠️ Installation

This project uses a Monorepo structure. You need to set up the Server and Client separately.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/YourUsername/inkbytr.git](https://github.com/YourUsername/inkbytr.git)
    cd InkBytr
    ```

2.  **Backend Setup:**

    ```bash
    # Navigate to the server directory
    cd Server
    
    # Install dependencies
    npm install
    ```

    Create a `.env` file in the `Server/` folder with the following keys:

    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inkbytr
    JWT_SECRET=your_super_secret_jwt_key
    SENDGRID_API_KEY=SG.your_sendgrid_api_key
    FRONTEND_URL=http://localhost:5173
    ```

3.  **Frontend Setup:**

    ```bash
    # Open a new terminal, navigate to the client directory
    cd Client
    
    # Install dependencies
    npm install
    ```

    Create a `.env` file in the `Client/` folder:

    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

## 🚀 Usage

You need to run both the backend and frontend terminals simultaneously.

1.  **Run the Backend Server:**

    ```bash
    # From the /Server directory
    npm run dev
    # Server runs on http://localhost:5000
    ```

2.  **Run the Frontend Server:**

    ```bash
    # From the /Client directory
    npm run dev
    # Client runs on http://localhost:5173
    ```

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the code or add features:

1.  Fork the repository.
2.  Create a new Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 👤 Author

**Abhishek Kashyap**

* Github: [@abhishek-ashyap](https://github.com/abhishek-ashyap)
* LinkedIn: Abhishek Kashyap

## 📄 License

This project is licensed under the MIT License.