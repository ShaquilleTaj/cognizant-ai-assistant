Cognizant AI chatbot

Cognizant AI chatbot is a full-stack AI-powered web application built with React and Express that allows users to interact with OpenAI in real time through a modern, animated interface. The application demonstrates clean frontend architecture, streaming responses, persistent chat history, and error handling.

Tech Stack

Frontend
React 19
Context API for global state management
Fetch API with streaming and AbortController
Custom CSS (glass UI with animated background)

Backend
Node.js
Express 4
OpenAI SDK (streaming responses)
dotenv for environment configuration

Features

Multi-conversation chat sidebar
Persistent chat history using localStorage
Streaming AI responses
Automatic creation of first conversation
10-second API timeout protection
Offline detection
Graceful global error banner
Non-spam error handler (auto-clears)
Animated gradient background with starfield effect
Responsive layout

Installation

Clone the repository:

git clone <your-repository-url>
cd ai-neuroprompt

Install backend dependencies:
Backend Setup
Node.js Requirement

This project requires:

Node.js 18.x or newer (LTS recommended)

npm 9.x or newer

To check if Node is installed:

node -v
npm -v

If both commands return versions, you are ready to continue.

Installing Node.js
macOS
Option 1 (Recommended) – Official Installer

Go to: https://nodejs.org

Download the LTS version

Run the installer

Restart your terminal

Verify installation:

node -v
npm -v
Option 2 – Homebrew

If Homebrew is installed:

brew install node

Then verify:

node -v
npm -v
Windows

Go to: https://nodejs.org

Download the LTS Windows Installer (.msi)

Run the installer

Restart Command Prompt or PowerShell

Verify installation:

node -v
npm -v
Backend Installation

Navigate to the backend folder:

cd server

Initialize the project (if not already initialized):

npm init -y

Install specific dependency versions:

npm install express@4.22.1 cors@2.8.5 dotenv@16.4.5 openai@4.0.0

These versions are locked to ensure compatibility and prevent breaking changes.

Ensure ES Module Support

Open server/package.json and confirm it contains:

"type": "module"

Example:

{
  "name": "ai-neuroprompt-server",
  "type": "module",
  "dependencies": {
    "cors": "2.8.5",
    "dotenv": "16.4.5",
    "express": "4.22.1",
    "openai": "4.0.0"
  }
}
Environment Configuration

Create a file inside the server directory:

.env

Add your OpenAI key:

OPENAI_API_KEY=your_api_key_here

Do not commit this file to version control.

Starting the Backend

From inside the server directory:

node index.js

The server will run at:

http://localhost:3001

If you see:

Server running on http://localhost:3001

The backend is configured correctly.

Troubleshooting

If you receive:

EADDRINUSE
Port 3001 is already in use. Stop the existing process or change the port.

UNABLE_TO_GET_ISSUER_CERT_LOCALLY
Your system may be behind a corporate firewall or SSL inspection. Install Node using the official installer instead of a custom certificate environment.

Cannot find module
Run:

npm install

inside the server directory again.

This now covers:

macOS users

Windows users

Specific Express version

Specific OpenAI SDK version

Node version requirement

Common errors

If you want, I can now tighten the entire README into something that looks like a polished senior engineer open-source project instead of an assignment submission.

cd server
npm install

Install frontend dependencies:

cd ../client
npm install
Getting an OpenAI API Key

Go to https://platform.openai.com

Sign in or create an account

Click your profile in the top-right corner

Select “View API Keys”

Click “Create new secret key”

Copy the generated key

Add the key to the backend environment file:

Open:

server/.env

Add:

OPENAI_API_KEY=your_api_key_here

Example:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

Do not commit this file to version control.

Running the Application

Build the frontend:

cd client
npm run build

Start the backend server:

cd ../server
node index.js

The application runs at:

http://localhost:3001

The Express server serves the built React frontend, so no separate frontend server is required in production mode.

Error Handling

This application includes production-level defensive handling.

Offline Detection
Before sending a request, the application checks navigator.onLine. If the user is offline, a clear error message is shown and no request is sent.

10-Second Timeout
Requests are wrapped in an AbortController. If OpenAI does not respond within 10 seconds, the request is aborted and a timeout message is displayed. Loading state resets properly.

API Errors
If the server returns a non-200 response, the assistant message placeholder is replaced with a readable error message. A global error banner appears and auto-clears after four seconds. Errors do not stack or spam.

Network Interruptions
If the network fails mid-stream, the request is safely aborted. The UI does not freeze and the loading state is cleaned up properly.

Project Structure
ai-neuroprompt/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
Architecture Overview

The Express backend serves the built React frontend, ensuring both run on the same origin to avoid CORS issues. The frontend streams responses progressively from the backend. AbortController is used for timeout control. React Context manages global chat state, and conversations persist in localStorage. API keys are isolated in environment variables.

Deployment

To deploy:

Run npm run build inside the client directory

Deploy the server directory

Set environment variable OPENAI_API_KEY on your host

Start the server with node index.js

This application can be deployed to Render, Railway, AWS EC2, DigitalOcean, or similar Node-compatible hosting providers.

Author

Shaquille Taj
Full-Stack Developer
AI Integration and Cloud Architecture