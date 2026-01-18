# Real-Time Chat Application

A lightweight real-time chat application built with Bun, TypeScript, and WebSockets. Features instant messaging, user presence notifications, and dynamic username changes.

## Features

- Real-time messaging using WebSockets
- User join/leave notifications
- Dynamic username changes
- Clean, modern UI with gradient design
- Lightweight and fast (powered by Bun)
- Mobile-responsive design

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Protocol**: WebSocket
- **Frontend**: Vanilla HTML/CSS/JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gentlecode1/chat.git
   cd chat
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the server:
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000/chat
   ```

## Project Structure

```
.
├── index.ts        # WebSocket server and routing
├── test.html       # Chat interface
├── package.json    # Project dependencies
└── tsconfig.json   # TypeScript configuration
```

## How It Works

The application uses WebSocket connections to enable real-time bidirectional communication between the server and clients. When a user sends a message, it's broadcast to all connected clients instantly.

**Key features:**
- `WeakMap` for efficient username storage
- Pub/sub pattern for message broadcasting
- Type-safe message handling with TypeScript
- Automatic connection cleanup on disconnect

## API

The server exposes two main endpoints:

- `GET /chat` - Serves the chat interface
- `WS /ws` - WebSocket endpoint for real-time communication

## License

MIT
