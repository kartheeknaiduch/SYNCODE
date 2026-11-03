# SYNCODE — Collaborative Coding Workspace

SYNCODE is a browser-based collaborative development environment that brings coding, project files, communication, and code execution into one workspace. It is designed to help developers work on the same project, edit files together, discuss changes, and run code without constantly switching between separate tools.

The application combines a React and TypeScript frontend with a Node.js and Express backend. Project data, files, collaboration state, and chat messages are stored in MongoDB.

## Table of Contents

- [What SYNCODE Does](#what-syncode-does)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Current Limitations](#current-limitations)
- [Maintainer](#maintainer)

## What SYNCODE Does

SYNCODE provides a shared workspace where users can:

1. Create and manage coding projects.
2. Invite collaborators and assign access roles.
3. Create, organize, edit, and save project files.
4. See collaborators' activity and code changes.
5. Communicate through project chat.
6. Review saved file revisions.
7. Run supported code and shell commands through the backend.
8. Use optional AI-assisted tools for explaining, generating, and improving code.
9. Preview HTML projects inside the editor.

It is intended for collaborative development, learning, pair programming, small team projects, and experimenting with code in a shared browser workspace.

## Key Features

| Feature | Description |
| --- | --- |
| Project dashboard | Create, open, rename, and delete projects. |
| Authentication | Register, log in, restore sessions, and access protected workspace routes. |
| Collaboration roles | Project owners can invite collaborators with viewer or editor access; backend access checks also support admin roles. |
| File explorer | Create files and folders, rename, move, delete, and organize project content. |
| Code editor | Monaco-based editor with language modes, tabs, editor settings, and dirty-state tracking. |
| Live collaboration | Socket.IO rooms broadcast code changes, cursor updates, and presence information. |
| File locking | Editors can acquire and release locks to reduce conflicting edits. |
| Autosave and revisions | File sessions autosave and create version snapshots that can be reviewed later. |
| Project chat | Send messages and reactions, with realtime delivery when configured and polling fallback otherwise. |
| Search | Search filenames, paths, and file contents in the current project. |
| Terminal | Run supported shell commands and stream process output through the backend. |
| Code execution | Run selected languages locally on the backend or through the configured Judge0 integration. |
| HTML preview | Preview HTML with project CSS and JavaScript in an iframe. |
| AI assistance | Optional Groq-powered chat and file operations for code explanation, fixes, refactoring, and generation. |
| Folder import | Import a local folder into a cloud project through the backend. |
| Workspace settings | Adjust editor font size, word wrap, minimap, and selected appearance settings. |

Some integrations require external credentials. See [Environment Configuration](#environment-configuration).

## How It Works

### 1. User and project flow

1. A visitor opens the application and registers or logs in.
2. The frontend authenticates with the backend and restores the user's session when a valid token exists.
3. The dashboard loads projects owned by the user or shared with them.
4. A user creates a project or opens an existing one.
5. The editor loads the project's files and joins the relevant collaboration rooms.
6. Collaborators can edit files, exchange chat messages, and see presence updates according to their project permissions.

### 2. Collaboration flow

- The frontend connects to the backend using Socket.IO.
- Authenticated users join project and file rooms after access checks.
- Code changes and cursor updates are broadcast to other connected collaborators.
- The backend maintains live file sessions and schedules autosaves.
- Saved file snapshots provide revision history.

### 3. Backend and data flow

- Express exposes the REST API.
- JWT middleware protects authenticated routes.
- Mongoose models store users, projects, files, collaborators, versions, presence, and chat messages.
- Socket.IO handles live collaboration and execution events.
- Optional services provide AI responses, realtime chat publishing, and remote code execution.

## Technology Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Zustand
- TanStack React Query
- Monaco Editor
- Tailwind CSS
- shadcn/Radix UI components
- Socket.IO Client
- Ably browser SDK (optional realtime chat)
- React Markdown
- Vitest and Testing Library

### Backend

- Node.js and native ES modules
- Express
- HTTP and Socket.IO
- MongoDB and Mongoose
- JWT authentication
- bcryptjs password hashing
- CORS and dotenv
- Ably server SDK (optional)
- Groq API (optional AI features)
- Judge0 API (selected language execution)
- Node child processes (local execution)

## Project Structure

```text
SYNCODE/
├── public/                      # Static assets
├── src/                         # React frontend
│   ├── components/
│   │   ├── auth/                 # Authentication and protected routes
│   │   ├── editor/               # Editor and workspace panels
│   │   ├── projects/             # Dashboard and project dialogs
│   │   └── ui/                   # Shared UI components
│   ├── hooks/                    # Auth, projects, files, sockets, chat
│   ├── lib/                      # API, preview, search and helper utilities
│   ├── pages/                    # Application pages
│   ├── store/                    # Zustand state
│   ├── test/                     # Frontend tests
│   ├── types/                    # TypeScript types
│   ├── App.tsx                   # Routes and providers
│   └── main.tsx                  # Frontend entry point
├── server/
│   ├── src/
│   │   ├── config/               # Database configuration
│   │   ├── middleware/           # Authentication and error handling
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # REST API routes
│   │   ├── socket/               # Collaboration and execution sockets
│   │   └── utils/                # Shared backend utilities
│   └── package.json
├── .gitignore
├── package.json                 # Frontend scripts and dependencies
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── vercel.json
└── README.md
```

## Requirements

Install the following before running the project:

- Node.js 20 or newer
- npm
- MongoDB Community Server or a MongoDB Atlas database
- Git

Optional integrations:

- Groq API key for AI features
- Ably keys for realtime chat
- Judge0 API access for selected compiled-language execution

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kartheeknaiduch/SYNCODE.git
cd SYNCODE
```

### 2. Install frontend dependencies

From the project root:

```bash
npm install
```

### 3. Install backend dependencies

```bash
npm install --prefix server
```

### 4. Configure environment variables

Create `server/.env` for backend settings. A local example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sync_code
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:8080
```

Create a root `.env` only if you need to override frontend defaults:

```env
VITE_API_URL=http://localhost:5000/api
```

Add optional integration variables only when you configure those services. Never commit real credentials.

### 5. Start MongoDB

Make sure your local MongoDB service is running, or use a valid remote MongoDB connection string in `MONGODB_URI`.

The application uses Mongoose to create collections when data is first written; you do not need to manually create the collections.

## Environment Configuration

| Variable | Used by | Required | Purpose |
| --- | --- | --- | --- |
| `PORT` | Backend | No | Backend port; defaults to 5000. |
| `MONGODB_URI` | Backend | Yes | MongoDB connection string. |
| `JWT_SECRET` | Backend | Yes | Secret used to sign and verify authentication tokens. |
| `CLIENT_URL` | Backend | Recommended | Allowed frontend origin(s) for CORS. |
| `VITE_API_URL` | Frontend | No | Backend API base URL. |
| `GROQ_API_KEY` | Backend | For AI | Enables Groq-powered AI endpoints. |
| `ABLY_API_KEY` | Backend | Optional | Enables server-side Ably message publishing. |
| `VITE_ABLY_API_KEY` | Frontend | Optional | Enables browser-side Ably chat subscription. |

Use placeholders in documentation and examples. Keep actual values in local environment files or deployment secret settings.

## Running the Application

Run the backend and frontend in separate terminals.

### Terminal 1 — Backend

From the project root:

```bash
npm run dev:server
```

### Terminal 2 — Frontend

From the project root:

```bash
npm run dev:client
```

Default local addresses:

| Service | Address |
| --- | --- |
| Frontend | http://localhost:8080 |
| Backend | http://localhost:5000 |
| API health check | http://localhost:5000/api/health |

Open the frontend address in your browser and register an account to start using the workspace.

## Available Scripts

### Root package

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite frontend. |
| `npm run dev:client` | Start the Vite frontend. |
| `npm run dev:server` | Start the backend in watch mode. |
| `npm run build` | Build the frontend for production. |
| `npm run build:dev` | Build the frontend in development mode. |
| `npm run preview` | Preview the production frontend build. |
| `npm run lint` | Run ESLint. |
| `npm run test` | Run the test suite once. |
| `npm run test:watch` | Run tests in watch mode. |

### Backend package

```bash
npm --prefix server run dev
npm --prefix server run start
```

## API Overview

The backend API is mounted under `/api`.

| Area | Example endpoints | Purpose |
| --- | --- | --- |
| Health | `GET /health` | Check backend availability. |
| Authentication | `/auth/register`, `/auth/login`, `/auth/me`, `/auth/logout` | Account registration, login, and session operations. |
| Projects | `/projects` | Create, list, update, and delete projects. |
| Collaborators | `/projects/:projectId/collaborators` | Manage project collaborators and roles. |
| Files | `/projects/:projectId/files` | Create, read, update, move, lock, and delete project files. |
| File history | `/projects/:projectId/files/:fileId/history` | Retrieve saved file revisions. |
| Presence | `/projects/:projectId/presence` | Read or update presence information. |
| Chat | `/projects/:projectId/chat` | Read messages, send messages, and manage reactions. |
| AI | `/ai/chat`, `/ai/files/:action`, `/ai/execute` | Optional AI-assisted coding operations. |
| Local files | `/local/tree`, `/local/read`, `/local/save`, `/local/import` | Browse and import files through the backend. |

Most project, file, chat, AI, and local filesystem routes require authentication. Refer to the route implementation for request payloads and detailed response formats.

## Testing

Run the configured frontend test suite:

```bash
npm run test
```

Tests use Vitest and a jsdom environment. Existing tests cover selected chat behavior, file search, path helpers, preview helpers, and serialization utilities.

## Deployment

The repository includes a Vercel configuration for the Vite frontend.

### Frontend

- Build command: `npm run build`
- Output directory: `dist`
- Configure `VITE_API_URL` to point to the deployed backend API.
- Configure the frontend domain in the backend CORS settings.

### Backend

Deploy the Node.js/Express server separately on a Node-compatible hosting service.

Configure the required environment variables, including:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`

Add optional AI and realtime service credentials only if those integrations are enabled. Ensure the hosting platform supports the application's Socket.IO connections.

## Security Notes

- Never commit `.env` files, API keys, database credentials, or JWT secrets.
- Use a strong, unique `JWT_SECRET` in production.
- Restrict CORS to trusted frontend origins.
- The terminal and code execution features can run processes on the backend host. Do not expose them to untrusted users without adding strong isolation, resource limits, and authorization controls.
- Local filesystem endpoints operate on the backend machine. Deploy them only with appropriate access controls and path restrictions.
- Use a sandboxed execution service for untrusted code rather than running it directly on a production host.

## Current Limitations

- The Source Control area represents file revision history; full Git operations are not implemented in the application.
- The local filesystem editor is present in the codebase but is not currently exposed through the main application routes.
- Some extension and settings UI is demonstrative rather than a full extension runtime.
- SQL execution is validation-only.
- Judge0 execution depends on external service availability and rate limits.
- Realtime chat requires Ably configuration; otherwise the application uses polling.
- AI features require valid provider configuration.
- The terminal runner is not containerized by default.

## Maintainer

**Kartheek Naidu**  
GitHub: @kartheeknaiduch

---

## Code and licensing notice

This repository contains a customized working copy that may include inherited code. This README describes the current application and its setup; it does not transfer ownership of code or grant rights to redistribute third-party material. Review the applicable rights and permissions before redistributing or relicensing the project.
