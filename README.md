# MERN Stack Template

A reusable full-stack starter with JWT authentication, MongoDB/Mongoose, Express, and a React + TypeScript + Tailwind v4 frontend.

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, React Router
- **Backend:** Node, Express, MongoDB (Mongoose)
- **Auth:** JWT + bcrypt

## Features

- Register / login / get-current-user auth flow
- Protected routes on both backend (`protect` middleware) and frontend (`ProtectedRoute` component)
- Centralized error handling (`notFound` + `errorHandler`)
- Request logging middleware
- Axios instance with automatic JWT attachment
- React Context-based auth state (`AuthContext`)

## Getting Started

### 1. Clone and install

```bash
git clone "https://github.com/Jamwilltim/MERN-stack-template.git" my-new-app
cd my-new-app
npm run install:all
```

### 2. Set up environment variables

```bash
cp server/.env.example server/.env
```

Fill in `server/.env` with your own values:

| Variable     | Description                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `PORT`       | Backend server port (default: 5000)                                                                                      |
| `NODE_ENV`   | `development` or `production`                                                                                            |
| `MONGO_URI`  | MongoDB Atlas connection string                                                                                          |
| `JWT_SECRET` | Random secret for signing JWTs — generate with`node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |

### 3. Run the app

From the project root:

```bash
npm run dev
```

This runs both the backend (port 5000) and frontend (Vite dev server, port 5173) concurrently. Or run them separately:

```bash
npm run dev:server
npm run dev:client
```

## Project Structure

```
server/
├── config/ # DB connection
├── controllers/ # Route handler logic
├── middleware/ # auth, error handling, logging
├── models/ # Mongoose schemas
├── routes/ # Express routers
├── utils/ # Helpers (e.g. JWT generation)
└── index.js

client/
└── src/
├── api/ # Axios instance
├── components/ # Reusable components (e.g. ProtectedRoute)
├── context/ # AuthContext
├── pages/ # Route-level pages
└── App.tsx
```

## Auth Flow

1. `POST /api/auth/register` — create account, returns user + JWT
2. `POST /api/auth/login` — returns user + JWT
3. `GET /api/auth/me` — protected, returns current user based on JWT
4. Frontend stores JWT in `localStorage`, attached automatically to all API calls via the Axios interceptor
5. `ProtectedRoute` redirects unauthenticated users to `/login`

## Extending This Template

This template intentionally contains only generic, reusable auth scaffolding. When starting a new project:

1. Copy this template into a new folder / repo
2. Add domain-specific Mongoose models, controllers, and routes
3. Add corresponding frontend pages and API calls
4. Update this README with project-specific details

Fill in `<this-repo>` with your actual GitHub URL once you push it. That completes the template — a fresh clone gets you a working register→login→protected-route flow in under five minutes.
