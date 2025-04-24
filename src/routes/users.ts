import express from "express";
import pool from "../db";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email } = req.body;
        const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
        const { rows: existingUser } = await pool.query(checkEmailQuery, [email]);
        if (existingUser.length > 0) {
            res.status(400).json({ error: "Email already exists." });
            return;
        }
        const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
        const { rows: newUser } = await pool.query(query, [name, email]);
        res.status(201).json(newUser[0]);
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Error while trying to add a user." });
    }
});

export default router;