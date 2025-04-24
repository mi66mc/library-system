import express from "express";
import booksRouter from "./routes/books";
import usersRouter from "./routes/users";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Books API!");
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});