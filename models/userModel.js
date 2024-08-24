const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function createUser(username, password) {
    const [result] = await pool.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password]
    );
    return result.insertId;
}

async function getUserByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
        username,
    ]);
    return rows[0];
}

module.exports = {
    createUser,
    getUserByUsername,
};
