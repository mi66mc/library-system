import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/", async (_, res) => {
    try {
        const { rows: books } = await pool.query("SELECT * FROM books");
        res.json(books);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Error while trying to get books." });
    }
});

router.post("/", async (req, res) => {
    const { title, author, year } = req.body;
    
    try {
        const query = "INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *";
        const { rows: newBook } = await pool.query(query, [title, author, year]);
        res.status(201).json(newBook[0]);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Error while trying to add a book." });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const query = "DELETE FROM books WHERE id = $1 RETURNING *";
        const { rows: deletedBook } = await pool.query(query, [id]);
        
        if (deletedBook.length === 0) {
            res.status(404).json({ error: "Book not found." });
        } else {
            res.json({"message": "Book deleted successfully."});
        }
        
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Error while trying to delete a book." });
    }
});

export default router;