Inkbytr - A Full-Stack MERN Blogging PlatformInkbytr is a complete, feature-rich blogging application built from the ground up with the MERN stack (MongoDB, Express, React, Node.js). It provides a secure, modern, and intuitive platform for users to share their ideas, engage with content, and manage their own posts. The application features a robust role-based access control system, allowing administrators to moderate content effectively.Live Demo: [Link to your deployed frontend on Vercel]✨ Key FeaturesSecure JWT Authentication:User registration with real-time email verification via SendGrid.Secure login system with password hashing (bcrypt).A complete, secure password reset flow via email.Full CRUD for Posts:Authenticated users can Create, Read, Update, and Delete their own blog posts.Interactive Content:Users can like and unlike posts.A nested commenting system allows users to engage in discussions.Role-Based Access Control (RBAC):User Role: Standard permissions to create and manage their own content.Admin Role: Has full moderation privileges, including the ability to delete any post or comment on the platform.User Profiles:A dedicated "My Posts" page for users to view and manage all of their own content in one place.Security & Performance:Rate Limiting on authentication routes to prevent brute-force attacks.Helmet middleware for setting secure HTTP headers.A fast, responsive frontend built with Vite and styled with Tailwind CSS.Professional UI components from Shadcn/ui, including custom modals for a better user experience.🛠️ Tech StackFrontendFramework: React (with Vite)State Management: Redux ToolkitRouting: React RouterUI: Shadcn/ui & Tailwind CSSAPI Communication: AxiosForm Handling: React Hook Form with Zod for validationBackendRuntime: Node.jsFramework: ExpressDatabase: MongoDB with Mongoose for object data modelingAuthentication: JSON Web Token (JWT)Security: Bcrypt (password hashing), Helmet (security headers), Express Rate LimitEmail Service: SendGrid for transactional emails🚀 Getting Started LocallyTo get a local copy up and running, follow these simple steps.PrerequisitesNode.js (version 18.x or later recommended)npm (comes with Node.js)MongoDB (either a local installation or a connection URI from MongoDB Atlas)1. Clone the Repositorygit clone [https://github.com/your-username/inkbytr.git](https://github.com/your-username/inkbytr.git)
cd inkbytr
2. Setup the BackendNavigate to the server directory and install the dependencies.cd Server
npm install
Create a .env file in the Server directory and add the following environment variables. Make sure to replace the placeholder values.# MongoDB Connection String
MONGO_URI=mongodb://127.0.0.1:27017/blogapp

# JWT Secret Key (use a long, random string)
JWT_SECRET=your_super_secret_jwt_key

# Port for the backend server
PORT=5001

# SendGrid API Key and Frontend URL
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY
FRONTEND_URL=http://localhost:5173
3. Setup the FrontendIn a new terminal, navigate to the client directory and install its dependencies.cd client
npm install
Create a .env file in the client directory and add the following variable:VITE_API_URL=http://localhost:5001/api
4. Run the ApplicationYou will need two separate terminals open to run both the backend and frontend servers concurrently.To run the backend server:# In the /Server directory
npm run dev
To run the frontend client:# In the /client directory
npm run dev
Your application should now be running!Frontend: http://localhost:5173Backend API: http://localhost:5001