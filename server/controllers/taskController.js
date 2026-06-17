const Task = require("../models/Task");

/*
=====================================
GET ALL TASKS
GET /api/tasks
=====================================
*/

const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority } = req.query;

    let query = {
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

    const tasks = await Task.find(query).sort({
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
=====================================
GET SINGLE TASK
GET /api/tasks/:id
=====================================
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
=====================================
CREATE TASK
POST /api/tasks
=====================================
*/

const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
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
=====================================
UPDATE TASK
PUT /api/tasks/:id
=====================================
*/

const updateTask = async (req, res, next) => {
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

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    next(error);
  }
};

/*
=====================================
DELETE TASK
DELETE /api/tasks/:id
=====================================
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
      message: "Task deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};

/*
=====================================
DASHBOARD STATS
GET /api/tasks/stats/dashboard
=====================================
*/

const getTaskStats = async (req, res, next) => {
  try {

    const total = await Task.countDocuments({
      user: req.user._id,
    });

    const completed = await Task.countDocuments({
      user: req.user._id,
      status: "Completed",
    });

    const pending = await Task.countDocuments({
      user: req.user._id,
      status: "Pending",
    });

    const inProgress = await Task.countDocuments({
      user: req.user._id,
      status: "In Progress",
    });

    res.status(200).json({
      success: true,
      total,
      completed,
      pending,
      inProgress,
    });

  } catch (error) {
    next(error);
  }
};