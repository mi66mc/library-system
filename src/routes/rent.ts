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

export default router;