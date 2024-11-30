
# Project Setup and Docker Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/bipinemp/Task_Manager.git
cd Task_Manager
```

### 2. Run Docker compose command in terminal

```bash
docker compose up --build
```

### 3. Migrate the database

```bash
docker compose run backend npx prisma migrate dev --name init
```

### 4. Run Frontend and backend on browser

```bash
frontend - http://localhost:4173
backend - http://localhost:8000
```

## Features

- **Add, delete, and update Tasks**: Users can create new tasks, delete and update them.
- **Searching and Filtering**: Tasks can be sorted based on status and searched based on title.

## Technologies Used
- **React.js**: For building interactive UI.
- **React-Hook-Form**: For proper form management.
- **React-Query**: For proper server side state management.
- **zod**: For proper form validation.
- **shadcn-ui**: For pre-build UI components.
- **prisma**: ORM used for backend to database iteraction.

## Env
# backend : 
- DATABASE_URL=postgresql://postgres:pass@localhost:5432/db
- PORT=8000
- JWT_SECRET="#^*@*#(@#(@#jfdlfjdkf))"
- POSTGRES_USER=user
- POSTGRES_PASSWORD=pass
- POSTGRES_DB=db

# frontend :
- VITE_API_URL=http://localhost:8000/api
