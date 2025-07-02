# Qtec Technical Assesment - Frontend (React + TypeScript + Vite)


A modern frontend built with **React + TypeScript + Vite + Tailwind CSS** to communicate with a .NET Core backend via REST APIs.

---

## 🚀 Features

- ⚛️ React 18 with Vite
- 🔷 TypeScript for type safety
- 🎨 Tailwind CSS for fast and responsive UI
- 📡 Axios for API communication
- 🔒 Environment-based configuration using `.env`
- 📁 Modular folder structure
- 🌐 Works with .NET Core backend

---

## 📁 Folder Structure
```
src/
├── api/ # Axios setup & API URL builder
├── assets/ # Images, icons, fonts
├── components/ # Reusable UI components
├── hooks/ # Custom React hooks
├── models/ # TypeScript interfaces/models
├── pages/ # Route-based pages
├── utils/ # Helper functions
├── App.tsx # Main app layout
├── main.tsx # App entry point
└── index.css # Tailwind base styles
```
> All environment variables **must be prefixed with `VITE_`**.

---

## 🛠 Installation & Run

```bash
# 1. Clone the repo
git clone https://github.com/Munshi-Faysal/qtec-frontend.git
cd qtec-frontend

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
```

Runs at: http://localhost:5173
