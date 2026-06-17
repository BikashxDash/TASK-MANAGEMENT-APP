const Task = require("../models/Task");
const { validationResult } = require("express-validator");

/*
================================================
GET ALL TASKS
GET /api/tasks
================================================
*/

const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority } = req.query;

    const query = {
      user: req.user._id,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const tasks = await Task.find(query)
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    next(error);
  }
};

/*
================================================
GET SINGLE TASK
GET /api/tasks/:id
================================================
*/

const getTask = async (req, res, next) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    next(error);
  }
};

/*
================================================
CREATE TASK
POST /api/tasks
================================================
*/

const createTask = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    next(error);
  }
};
/*
================================================
UPDATE TASK
PUT /api/tasks/:id
================================================
*/

const updateTask = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    task.title =
      title ?? task.title;

    task.description =
      description ??
      task.description;

    task.priority =
      priority ??
      task.priority;

    task.status =
      status ??
      task.status;

    task.dueDate =
      dueDate ??
      task.dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message:
        "Task updated successfully",
      task,
    });

  } catch (error) {
    next(error);
  }
};

/*
================================================
DELETE TASK
DELETE /api/tasks/:id
================================================
*/

const deleteTask = async (req, res, next) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};
/*
================================================
GET DASHBOARD STATS
GET /api/tasks/stats/dashboard
================================================
*/

const getTaskStats = async (req, res, next) => {
  try {
    const total = await Task.countDocuments({
      user: req.user._id,
    });

    const pending = await Task.countDocuments({
      user: req.user._id,
      status: "Pending",
    });

    const inProgress = await Task.countDocuments({
      user: req.user._id,
      status: "In Progress",
    });

    const completed = await Task.countDocuments({
      user: req.user._id,
      status: "Completed",
    });

    const highPriority = await Task.countDocuments({
      user: req.user._id,
      priority: "High",
    });

    const mediumPriority = await Task.countDocuments({
      user: req.user._id,
      priority: "Medium",
    });

    const lowPriority = await Task.countDocuments({
      user: req.user._id,
      priority: "Low",
    });

    res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        inProgress,
        completed,
        priority: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

/*
================================================
EXPORT CONTROLLERS
================================================
*/

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
};