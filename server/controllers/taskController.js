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