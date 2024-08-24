const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function createProject(
    title,
    imageUrl,
    startDate,
    endDate,
    description,
    userId
) {
    const [result] = await pool.query(
        "INSERT INTO projects (title, image_url, start_date, end_date, description, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, imageUrl, startDate, endDate, description, userId]
    );
    return result.insertId;
}

async function getProjects(userId) {
    const [rows] = await pool.query(
        "SELECT * FROM projects WHERE user_id = ?",
        [userId]
    );
    return rows;
}

async function getProjectById(projectId) {
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [
        projectId,
    ]);
    return rows[0];
}

async function updateProject(
    projectId,
    title,
    imageUrl,
    startDate,
    endDate,
    description
) {
    await pool.query(
        "UPDATE projects SET title = ?, image_url = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?",
        [title, imageUrl, startDate, endDate, description, projectId]
    );
}

async function deleteProject(projectId) {
    await pool.query("DELETE FROM projects WHERE id = ?", [projectId]);
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
