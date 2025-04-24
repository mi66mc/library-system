import pool from "../db";

async function seedBooks() {
  const books = [
    { title: "Dom Casmurro", author: "Machado de Assis", year: 1899 },
    { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", year: 1954 },
    { title: "1984", author: "George Orwell", year: 1949 },
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

    // Insertion of books
    for (const book of books) {
      const query = "INSERT INTO books (title, author, year) VALUES ($1, $2, $3)";
      await pool.query(query, [book.title, book.author, book.year]);
    }
    console.log("Books inserted successfully!");
  } catch (error) {
    console.error("Error: ", error);
  }
}

seedBooks();