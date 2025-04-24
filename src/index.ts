import express from "express";
import booksRouter from "./routes/books";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("api/books", booksRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});