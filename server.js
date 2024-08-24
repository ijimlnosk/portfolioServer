const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
