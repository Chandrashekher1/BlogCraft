# Blogging Website

A full-stack blogging platform where users can create, view, and manage posts. Built with MERN Stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS for a sleek and responsive UI.

# Features
- Create, edit, and delete blog posts

- Rich-text editor for writing blogs (using Jodit)

- Secure authentication with JWT

- User profile with image upload (via Cloudinary)

- Responsive UI built with Tailwind CSS

- View all blogs and read full post

- Form validations and error handling

# Tech Stack
- Frontend : React.js, Tailwind CSS, MUI
- Backend : Node.js, Express.js
- Database : MongoDB
- Deployment : Vercel and Render

# View

# Getting Started
 Prerequisites
- React.js 19.1.0
- Mongodb Atlas Account

# Installation
 
1. Clone the repository
- git clone https://github.com/Chandrashekher1/VibeScript.git
2. Navigate to the project
- cd VibeScript
3. Backend Setup
- npm Install
- npm run dev
4. Frontend Setup
- npm Install
- npm start

# Environment Variables
- Create a .env file in your backend directory:
    MONGO_URI=mongodb+srv://cpsaw999041:SouCCRYvxW30xwO5@blogs.ypef5.mongodb.net/blogs?retryWrites=true&w=majority&appName=Blogs
    post_jwtPrivateKey=mySecureKey
    CLOUDINARY_NAME=dt9a9xhz1
    CLOUDINARY_KEY=271614543354583
    CLOUDINARY_SECRET=b-shBrRBRdjQ4iohbD3Sma1rOiA

# Folder Structure
    /frontend       # React App
    /backend        # Express Server
    /config         # Config file
    /middleware     # middleware 
    /models         # Mongoose Schemas
    /routes         # API Routes
    /utils          # Constants and helpers


# Contributing
- Contributions, issues, and feature requests are welcome! Feel free to check issues page.

# Deployment
Vercel
1. Push code to Github
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
