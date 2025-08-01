# Library Management API

This project is a simple Express-based API that allows users to interact with a PostgreSQL database to manage a library system. It supports basic operations such as retrieving all books and adding new books to the library.

### Features:
- **GET `/api/books`** - Retrieve all books from the library.
- **POST `/api/books`** - Add a new book to the library.
- **DELETE `/api/books/:id`** - Deletes a book from the library.
- **POST `/api/users`** - Add a new user to the library.
- **GET `/api/rent`** - Show all rents made by users.
- **POST `/api/rent`** - Rent a book to a user.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
3. [API Endpoints](#api-endpoints)
4. [Running the Application](#running-the-project)
6. [License](#license)

---

## Technologies Used

- **TypeScript** - Superset of JavaScript that adds static typing to the project.
- **Node.js** - JavaScript runtime for building server-side applications.
- **Express.js** - Web framework for Node.js to build the API.
- **PostgreSQL** - Relational database used to store book data.
- **pg (node-postgres)** - PostgreSQL client for Node.js to interact with the database.
- **dotenv** - Package for managing environment variables securely.

---

## Project Setup

### 1. Clone the repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/mi66mc/library-system.git
cd library-system
```

### 2. Install dependencies

Install the project dependencies using `npm`:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root of the project to store your environment variables, such as the database connection string:

```bash
touch .env
```

Inside the `.env` file, add your PostgreSQL database connection string. Here's an example of what the contents might look like (you can get this URL from your Supabase or PostgreSQL setup):

```
DATABASE_URL=postgres://username:password@localhost:5432/mydatabase
```

Make sure to replace username, password, localhost, and mydatabase with your actual PostgreSQL connection details.

(In this project, in the test Supabase was used as host to the database.)

### 4. Create the Database and Table

Before running the API, ensure that your PostgreSQL database and table are set up. You can execute the following SQL commands to create the `books` table:

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER NOT NULL
);
```

Or you can use to seed 3 books in the database and create the table:

```bash
npm run seed
```

---

## API Endpoints

### `GET api/books`

> **Description:** return all books of the database.
> **Response:** 

```json
[
  {
    "id": 1,
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "year": 1899
  },
  ...
]
```

### `POST api/books`

> **Description:** adds a new book to the database.

> **Request body:** 

```json
{
    "title": "O Alienista",
    "author": "Machado de Assis",
    "year": 1882
}
```

> **Response:**

```json
{
    "id": 5831,
    "title": "O Alienista",
    "author": "Machado de Assis",
    "year": 1882
}
```

### `DELETE api/books/:id`

> **Description:** deletes a book from the database.

> **Response:**

```json
{
    "message": "Book deleted successfully."
}
```

### `POST api/users`
> **Description:** adds a new user to the database.

> **Request body:** 

```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

> **Response:**

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}
```

### `GET api/rent`
> **Description:** shows all rents made by users.

> **Response:**

```json
[
  {
    "id": 1,
    "start_date": "2025-04-26T17:18:10.782Z",
    "end_date": "2025-05-03T17:18:10.782Z",
    "user": {
      "id": 1,
      "name": "Alice"
    },
    "book": {
      "id": 1,
      "title": "Dom Casmurro"
    }
  },
  ...
]
```

### `POST api/rent`
> **Description:** rents a book to a user.

> **Request body:** 

```json
{
    "user_id": 1,
    "book_id": 1,
    "start_date": "2025-04-26T17:18:10.782Z",
    "end_date": "2025-05-03T17:18:10.782Z"
}
```

`start_date` and `end_date` are optional, if not provided, the current date will be used and 7 days for the rent.

> **Response:**

```json
{
    "id": 4,
    "user_id": 1,
    "book_id": 3,
    "start_date": "2025-04-27T22:33:00.241Z",
    "end_date": "2025-05-04T22:33:00.242Z"
}
```

---

## Running the project

### 1. Start the server

Firstly build the project and then you can run it:

```bash
npm run build
npm run start
```

### 2. Run in development mode

You can run in development mode with nodemon with the command:

```bash
npm run dev
```

---

## License

This project is under MIT license.