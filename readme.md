# Expense Management Backend

This is the backend for the Expense Management Application. It provides APIs for managing expenses, including fetching, filtering, adding, and deleting expenses. It also includes user authentication via JWT and handles expense categorization.

## Features

- **User Authentication**: Secure login with JWT-based authentication.
- **Expense Management**: APIs for adding, fetching, and deleting expenses.
- **Expense Filtering**: Filter expenses by date, category, and user email.
- **JWT Authentication**: Authorization for fetching user-specific data based on token.
- **Error Handling**: Handles errors gracefully and returns appropriate error messages.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (for storing user data and expenses)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd expense-management-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:

    Create a `.env` file in the root directory and add the following:

    ```
    JWT_SECRET=your_jwt_secret_key
    MONGO_URI=mongodb://localhost:27017/expense_management
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

   The server will start on `http://localhost:10000`.

## API Endpoints

### 1. **User Registration (Sign Up)**

#### `POST /user/signup`
- **Request body**:
    ```json
    {
      "username": "user_name",
      "email": "user_email@example.com",
      "password": "user_password"
    }
    ```

- **Response**:
    ```json
    {
      "success": true,
      "message": "User registered successfully."
    }
    ```

### 2. **User Login**

#### `POST /user/login`
- **Request body**:
    ```json
    {
      "email": "user_email@example.com",
      "password": "user_password"
    }
    ```

- **Response**:
    ```json
    {
      "success": true,
      "token": "jwt_token_here"
    }
    ```

### 3. **Fetch Expenses**

#### `GET /expenses`
- **Query Parameters**:
    - `category` (optional): Filter expenses by category.
    - `startDate` (optional): Filter expenses by start date.
    - `endDate` (optional): Filter expenses by end date.

- **Authorization**: You must pass the JWT token in the `Authorization` header as `Bearer <token>`.

- **Response**:
    ```json
    {
      "success": true,
      "expenses": [
        {
          "_id": "expense_id",
          "date": "2025-01-01",
          "category": "Food",
          "description": "Lunch",
          "amount": 15.5
        },
        {
          "_id": "expense_id_2",
          "date": "2025-01-02",
          "category": "Transport",
          "description": "Bus ticket",
          "amount": 2.5
        }
      ]
    }
    ```

### 4. **Add New Expense**

#### `POST /expenses`
- **Request body**:
    ```json
    {
      "date": "2025-01-01",
      "category": "Food",
      "description": "Lunch",
      "amount": 15.5
    }
    ```

- **Response**:
    ```json
    {
      "success": true,
      "message": "Expense added successfu

## Security

- **JWT Authentication**: Ensure the token is passed in the `Authorization` header as `Bearer <token>` for protected routes.
- **Password Hashing**: Passwords are securely hashed using `bcrypt`.

## Error Handling

- **401 Unauthorized**: When the JWT token is missing or invalid.
- **500 Internal Server Error**: For general errors in server logic.
