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
    // rents, with timestamp
    const rents = [
      { user_id: 1, book_id: 1, start_date: new Date(), end_date: new Date(new Date().setDate(new Date().getDate() + 7)) },
      { user_id: 2, book_id: 2, start_date: new Date(), end_date: new Date(new Date().setDate(new Date().getDate() + 14)) },
      { user_id: 3, book_id: 3, start_date: new Date(), end_date: new Date(new Date().setDate(new Date().getDate() + 21)) },
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

    // Check if table exists, if not, create it
    const queryCheckTableRents = "SELECT to_regclass(\'public.rent\')";
    const { rows: checkResultRents } = await pool.query(queryCheckTableRents);
    
    if (checkResultRents[0].to_regclass === null) {
      console.log("Table 'rent' does not exist, creating it...");

      // Table creation query
      const createTableQueryRents = `
        CREATE TABLE rent (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          book_id INTEGER REFERENCES books(id),
          start_date TIMESTAMP NOT NULL,
          end_date TIMESTAMP NOT NULL
        );
      `;

      await pool.query(createTableQueryRents);
      console.log("Table 'rent' created with success!");
    } else {
      console.log("Tabela 'rent' já existe.");
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
    // insertion of rents
    for (const rent of rents) {
      const query = "INSERT INTO rent (user_id, book_id, start_date, end_date) VALUES ($1, $2, $3, $4)";
      await pool.query(query, [rent.user_id, rent.book_id, rent.start_date, rent.end_date]);
    }
    console.log("Rents inserted successfully!");
  } catch (error) {
    console.error("Error: ", error);
  }
}

seedBooks();