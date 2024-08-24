const projectModel = require("../models/projectModel");

async function createProject(req, res) {
    try {
        const { title, imageUrl, startDate, endDate, description } = req.body;
        const userId = req.user.id; // Assuming you have authentication middleware
        const projectId = await projectModel.createProject(
            title,
            imageUrl,
            startDate,
            endDate,
            description,
            userId
        );
        res.status(201).json({
            message: "Project created successfully",
            projectId,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating project",
            error: error.message,
        });
    }
}

async function getProjects(req, res) {
    try {
        const userId = req.user.id; // Assuming you have authentication middleware
        const projects = await projectModel.getProjects(userId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching projects",
            error: error.message,
        });
    }
}

async function getProject(req, res) {
    try {
        const projectId = req.params.id;
        const project = await projectModel.getProjectById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching project",
            error: error.message,
        });
    }
}

async function updateProject(req, res) {
    try {
        const projectId = req.params.id;
        const { title, imageUrl, startDate, endDate, description } = req.body;
        await projectModel.updateProject(
            projectId,
            title,
            imageUrl,
            startDate,
            endDate,
            description
        );
        res.json({ message: "Project updated successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error updating project",
            error: error.message,
        });
    }
}

async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        await projectModel.deleteProject(projectId);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting project",
            error: error.message,
        });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};
