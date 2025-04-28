import express from "express";
import pool from "../db";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { user_id, book_id } = req.body;
        let { start_date, end_date } = req.body;
        if (!user_id || !book_id) {
            res.status(400).json({ error: "User ID and book ID are required." });
            return; 
        } else if (!start_date || !end_date) {
            start_date = new Date().toISOString();
            end_date = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
        }
        const query = "INSERT INTO rent (user_id, book_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *";
        const { rows: newRent } = await pool.query(query, [user_id, book_id, start_date, end_date]);
        res.status(201).json(newRent[0]);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Error while trying to add a rent." });
    }
});

router.get("/", async (_, res) => {
    try {
        const query = "SELECT * FROM rent";
        const { rows: rents } = await pool.query(query);
        const rentsWithDetails = await Promise.all(rents.map(async (rent) => {
            const userQuery = "SELECT * FROM users WHERE id = $1";
            const bookQuery = "SELECT * FROM books WHERE id = $1";
            const { rows: user } = await pool.query(userQuery, [rent.user_id]);
            const { rows: book } = await pool.query(bookQuery, [rent.book_id]);
            return {
                ...rent,
                user: user[0],
                book: book[0]
            };
        }));

        res.json(rentsWithDetails.map(rent => ({
            id: rent.id,
            start_date: rent.start_date,
            end_date: rent.end_date,
            user: {
                id: rent.user.id,
                name: rent.user.name
            },
            book: {
                id: rent.book.id,
                title: rent.book.title
            }
        })));
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Error while trying to get rents." });
    }
});

export default router;