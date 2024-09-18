# Task Management API

This is a NestJS GraphQL API for task management. Follow these steps to test all endpoints end-to-end.

## Prerequisites

- Node.js and npm installed

## How to run

- Run `npm install` to install the dependencies
- Run `npm run start:dev` to start the server
- Open `http://localhost:5500/graphql` to access the GraphQL Playground

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
mutation {
  signup(input: {
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
  updateTask(id: 1, updateTaskInput: {
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
