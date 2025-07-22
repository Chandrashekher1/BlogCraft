# BlogCraft - AI-Powered Blogging Platform

BlogCraft is a modern, full-featured blogging platform that empowers users to create, manage, and share blog content with ease. Designed with a focus on simplicity and creativity, BlogCraft offers a seamless writing and reading experience along with powerful AI integration for content generation.

# Features
-  Create, update and delete blog posts
-  Rich Text Blogging – Write and format blogs with Markdown and HTML support.
-  Multimedia Embeds – Add images, videos, and links to bring your stories to life.
-  AI Blog Generator – Generate blog content with the help of integrated AI assistance to kickstart your ideas
-  Dark Mode – Enjoy a modern and visually comfortable UI with dark/light mode toggle.
-  User Accounts & Guest Login – Sign up, log in, or browse as a guest with limited access.
-  Dashboard – View and manage your blogs with an intuitive dashboard.
-  Responsive Design – Optimized for all devices: mobile, tablet, and desktop
  
# Tech Stack
- Frontend : React.js, Tailwind CSS, MUI
- Backend : Node.js, Express.js, 
- Database : MongoDB
- Authentication: JWT (JSON Web Tokens)
- Styling: Tailwind CSS & MUI Components
- Deployment : Vercel and Render

# View
<img width="1848" height="876" alt="image" src="https://github.com/user-attachments/assets/674f67e3-d21b-494c-ae1c-e88e17e40996" />

<img width="1810" height="785" alt="image" src="https://github.com/user-attachments/assets/4738a85e-f33e-4c78-bae9-729dd0794b3c" />

# Getting Started
 Prerequisites
- React.js 18.1.0
- Mongodb Atlas Account

## Installation
 
# Clone the repository
git clone https://github.com/chandrashekher1/blogcraft.git
- cd blogcraft

# Install dependencies
npm install

# Start development server
npm run dev


# Folder Structure
```   src/
├── components/       # Reusable UI components
├── pages/            # All screen pages (Home, Blog, Dashboard, etc.)
├── services/         # Axios calls & API functions
├── context/          # Theme & Auth context
├── utils/            # Constants and helpers
├── App.jsx
├── main.jsx
```


# Contributing
- Contributions, issues, and feature requests are welcome! Feel free to check issues page.

# Deployment
Vercel
1. Push code to Github
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## License
MIT

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
