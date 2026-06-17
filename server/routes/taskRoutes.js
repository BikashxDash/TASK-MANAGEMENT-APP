const express = require("express");
const { body } = require("express-validator");

const protect = require("../middleware/authMiddleware");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");

const router = express.Router();

// Protect all routes
router.use(protect);

/*
=====================================
Dashboard Statistics
GET /api/tasks/stats/dashboard
=====================================
*/
router.get("/stats/dashboard", getTaskStats);

/*
=====================================
Get All Tasks
GET /api/tasks
=====================================
*/
router.get("/", getTasks);

/*
=====================================
Get Single Task
GET /api/tasks/:id
=====================================
*/
router.get("/:id", getTask);

/*
=====================================
Create Task
POST /api/tasks
=====================================
*/
router.post(
  "/",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Task title is required")
      .isLength({ max: 100 })
      .withMessage("Task title cannot exceed 100 characters"),

    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),

    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid status"),

    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Invalid priority"),
  ],
  createTask
);

/*
=====================================
Update Task
PUT /api/tasks/:id
=====================================
*/
router.put(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Task title must be between 1 and 100 characters"),

    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),

    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid status"),

    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High"])
      .withMessage("Invalid priority"),
  ],
  updateTask
);

/*
=====================================
Delete Task
DELETE /api/tasks/:id
=====================================
*/
router.delete("/:id", deleteTask);

module.exports = router;