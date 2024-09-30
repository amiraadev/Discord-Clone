# Discord Clone

This is a fully functional Discord clone built using modern web technologies including **React**, **NestJS**, **Redis**, **PostgreSQL**, **Docker Compose**, **Mantine UI**, **Clerk**, **GraphQL** (with **Apollo**), **Prisma**, **Zustand**, and **graphql-upload**.

## Features

- **Real-time messaging** with WebSocket support.
- **User authentication and authorization** with Clerk.
- **Role-based access control** for channels and servers.
- **File uploads** for images, videos, and other attachments with `graphql-upload`.
- **Real-time notifications** and updates via Redis Pub/Sub.
- **State management** with Zustand.
- **PostgreSQL database** for storing user data, messages, and channel information.
- **Prisma ORM** for database interaction and migrations.
- **GraphQL API** for fetching and mutating data efficiently.
- **Docker Compose** setup for easy deployment and development.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Mantine UI**: A modern UI library used for a sleek and responsive user experience.
- **Apollo Client**: GraphQL client for managing data fetching in the frontend.
- **Zustand**: State management for predictable and centralized global state.

### Backend
- **NestJS**: A progressive Node.js framework for building scalable server-side applications.
- **GraphQL**: Query language used for interacting with the API.
- **Apollo Server**: Used on the backend to manage GraphQL requests.
- **Prisma**: ORM used to manage PostgreSQL database schema and queries.
- **Clerk**: User management system for authentication and authorization.
- **Redis**: In-memory data store for caching and real-time pub/sub functionality.
- **PostgreSQL**: Relational database used to store persistent data.
- **Docker Compose**: For containerized application orchestration.

## Prerequisites

Make sure you have the following installed on your machine:

- **Docker & Docker Compose**: To run the application in containers.
- **Node.js (v18.x or later)**: For local development without Docker.
- **PostgreSQL**: A running PostgreSQL instance if you don't use Docker.

## Installation

1. Clone the repository:

    ```bash
    git clone [https://github.com/your-username/discord-clone.git](https://github.com/amiraadev/Discord-Clone)
    cd discord-clone
    ```

2. Create a `.env` file in the root directory based on the `.env.example` file and fill in the necessary environment variables:

    ```
    DATABASE_URL=postgresql://username:password@db:5432/discord_clone
    REDIS_URL=redis://redis:6379
    CLERK_API_KEY=your-clerk-api-key
    CLERK_FRONTEND_API=your-clerk-frontend-api
    GRAPHQL_ENDPOINT=http://localhost:4000/graphql
    ```

3. Install dependencies for both frontend:

    ```bash
    # Frontend
    cd frontend
    npm install
    npm run dev
       ```

4. Start the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```
5. Migrate the Prisma schema to the database:
      ```bash
   npx prisma migrate dev
    ```
6. Install dependencies for both frontend:
   
    # Backend
   ```bash
    cd ../backend
    npm install
    npm run start:dev
    ```



   
