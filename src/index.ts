import express from "express";
import booksRouter from "./routes/books";
import usersRouter from "./routes/users";
import rentRouter from "./routes/rent";
import path from "path";
import db from "./db";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./views")));
app.set("view engine", "ejs");

app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/rent", rentRouter);

app.get("/", (_, res) => {
  try {
    const query = "SELECT * FROM books";
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Error while trying to get books." });
      } else {
        res.render("index", { books: result.rows });
      }
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error while trying to get books." });
  }
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});