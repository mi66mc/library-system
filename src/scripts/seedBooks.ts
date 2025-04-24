import pool from "../db";

async function seedBooks() {
  const books = [
    { title: "Dom Casmurro", author: "Machado de Assis", year: 1899 },
    { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", year: 1954 },
    { title: "1984", author: "George Orwell", year: 1949 },
  ];
  const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
    ];

  try {
    // Check if table exists, if not, create it
    const queryCheckTable = "SELECT to_regclass(\'public.books\')";
    const { rows: checkResult } = await pool.query(queryCheckTable);

    if (checkResult[0].to_regclass === null) {
      console.log("Table 'books' does not exist, creating it...");

      // Table creation query
      const createTableQuery = `
        CREATE TABLE books (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          year INTEGER NOT NULL
        );
      `;

      await pool.query(createTableQuery);
      console.log("Table 'books' created with success!");
    } else {
      console.log("Tabela 'books' já existe.");
    }

    // Check if table exists, if not, create it
    const queryCheckTableUsers = "SELECT to_regclass(\'public.users\')";
    const { rows: checkResultUsers } = await pool.query(queryCheckTableUsers);

    if (checkResultUsers[0].to_regclass === null) {
      console.log("Table 'users' does not exist, creating it...");

      // Table creation query
      const createTableQueryUsers = `
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE
        );
      `;

      await pool.query(createTableQueryUsers);
      console.log("Table 'users' created with success!");
    } else {
      console.log("Tabela 'users' já existe.");
    }

    // Insertion of books
    for (const book of books) {
      const query = "INSERT INTO books (title, author, year) VALUES ($1, $2, $3)";
      await pool.query(query, [book.title, book.author, book.year]);
    }
    console.log("Books inserted successfully!");
    // Insertion of users
    for (const user of users) {
      const query = "INSERT INTO users (name, email) VALUES ($1, $2)";
      await pool.query(query, [user.name, user.email]);
    }
    console.log("Users inserted successfully!");
  } catch (error) {
    console.error("Error: ", error);
  }
}

seedBooks();