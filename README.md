# Task Management API

This is a NestJS GraphQL API for task management. Follow these steps to test all endpoints end-to-end.

## Prerequisites

- Node.js and npm installed
- Node version: >= 20

## How to run

1. Install dependencies:
```
npm install
```    
2. Set up environment variables:
- Copy the contents of `.env.example` to a new file named `.env`:
  ```
  cp .env.example .env
  ```
- For quick setup, you can use the dummy database credentials provided in `.env.example`. These are suitable for development purposes.

3. Start the server: 
```
npm run start:dev
```

4. Access the GraphQL Playground:
Open `http://localhost:5500/graphql` in your web browser.

### Using custom database credentials

If you want to use your own database (I used Supabase for my postgres link above):

1. Open the `.env` file.
2. Replace the `DATABASE_URL` value with your own PostgreSQL connection string:

```
DATABASE_URL="" #The Transaction connection pooler string
DIRECT_URL=""  #The Session connection pooler string
```
3. Save the file.
4. Run Prisma migrations to set up your new database:

```
npx prisma migrate dev --name init
```
5. Restart the server for the changes to take effect:
```
npm run start:dev
```

Note: Ensure your PostgreSQL server is running and the database specified in the connection string exists before running migrations and starting the application.


## Testing Endpoints

Use a GraphQL client like GraphQL Playground (available at `http://localhost:5500/graphql` when the server is running) or a tool like Postman to send these requests.

### 1. Health Check

Query:
```graphql
query {
  healthCheck
}
```

Expected result: "OK"

### 2. User Registration

```
mutation SignUp {
  signup(input: {
    email: "user@example.com"
    password: "password123"
    role: ADMIN
  }) {
    token
    user {
      id
      email
      role
    }
  }
}
```

### 3. User Login

```
mutation {
  login(input: {
    email: "test@example.com"
    password: "password123"
  }) {
    token
    user {
      id
      email
      role
    }
  }
}
```

## Important

For all subsequent requests, use the token received from login. Add it to the HTTP headers in your GraphQL client:

```
Authorization: Bearer <token>
```

### 4. Create a Task

```
mutation {
  createTask(createTaskInput: {
    title: "Test Task"
    description: "This is a test task"
    status: OPEN
    dependencyId: 1 | null
  }) {
    id
    title
    description
    status
    createdAt
  }
}
```

### 5. Get All Tasks
```
query {
  tasks {
    id
    title
    description
    status
    createdAt
  }
}
```

### 6. Get Specific Task

```
query {
  task(id: 1) {
    id
    title
    description
    status
    createdAt
  }
}
```

### 7. Update a Task

```
mutation {
  updateTask(id: 1, input: {
    id: 1
    status: IN_PROGRESS
    description: "Updated description"
  }) {
    id
    title
    description
    status
    createdAt
  }
}
```


### 8. Delete a Task

```
mutation {
  deleteTask(id: 1)
}
```


### 9. Get Ready Tasks
```
query {
  readyTasks {
    id
    title
    description
    status
    createdAt
  }
}
```
