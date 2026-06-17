// import { useState } from "react";

// import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";

// import StatsCards from "../components/task/StatsCards";
// import TaskCard from "../components/task/TaskCard";
// import TaskModal from "../components/task/TaskModal";

// import EmptyState from "../components/common/EmptyState";

// const initialTasks = [
//   {
//     _id: "1",
//     title: "Complete Internship Task",
//     description: "Build MERN Task Management Application",
//     priority: "High",
//     status: "Pending",
//     dueDate: "2026-06-25",
//   },
//   {
//     _id: "2",
//     title: "Push Project to GitHub",
//     description: "Upload latest source code",
//     priority: "Medium",
//     status: "In Progress",
//     dueDate: "2026-06-21",
//   },
// ];

// export default function Dashboard() {
//   const [tasks, setTasks] = useState(initialTasks);

//   const [search, setSearch] = useState("");

//   const [modalOpen, setModalOpen] = useState(false);

//   const [selectedTask, setSelectedTask] =
//     useState(null);

//   const filteredTasks = tasks.filter((task) =>
//     task.title
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const stats = {
//     total: tasks.length,
//     pending: tasks.filter(
//       (t) => t.status === "Pending"
//     ).length,
//     inProgress: tasks.filter(
//       (t) => t.status === "In Progress"
//     ).length,
//     completed: tasks.filter(
//       (t) => t.status === "Completed"
//     ).length,
//   };

//   const handleCreate = (taskData) => {
//     const newTask = {
//       _id: Date.now().toString(),
//       ...taskData,
//     };

//     setTasks((prev) => [newTask, ...prev]);
//   };

//   const handleEdit = (taskData) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task._id === selectedTask._id
//           ? { ...task, ...taskData }
//           : task
//       )
//     );

//     setSelectedTask(null);
//   };

//   const handleDelete = (id) => {
//     if (
//       window.confirm(
//         "Delete this task?"
//       )
//     ) {
//       setTasks((prev) =>
//         prev.filter(
//           (task) => task._id !== id
//         )
//       );
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-100">

//       <Sidebar />

//       <div className="flex-1">

//         <Navbar
//           search={search}
//           setSearch={setSearch}
//         />

//         <main className="p-8">

//           <div className="flex justify-between items-center mb-8">

//             <h1 className="text-3xl font-bold">
//               Dashboard
//             </h1>

//             <button
//               onClick={() => {
//                 setSelectedTask(null);
//                 setModalOpen(true);
//               }}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
//             >
//               + Add Task
//             </button>

//           </div>

//           <StatsCards data={stats} />

//           <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <TaskCard
//                   key={task._id}
//                   task={task}
//                   onEdit={() => {
//                     setSelectedTask(task);
//                     setModalOpen(true);
//                   }}
//                   onDelete={handleDelete}
//                 />
//               ))
//             ) : (
//               <EmptyState />
//             )}

//           </div>

//         </main>

//       </div>

//       <TaskModal
//         isOpen={modalOpen}
//         onClose={() => {
//           setModalOpen(false);
//           setSelectedTask(null);
//         }}
//         initialData={selectedTask}
//         onSubmit={
//           selectedTask
//             ? handleEdit
//             : handleCreate
//         }
//       />

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import StatsCards from "../components/task/StatsCards";
import TaskCard from "../components/task/TaskCard";
import TaskModal from "../components/task/TaskModal";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import {
  getTasks,
  getTaskStats,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const fetchDashboard = async () => {
  try {
    setLoading(true);

    const taskRes = await getTasks();

    const statsRes =
      await getTaskStats();

    setTasks(taskRes.tasks || []);

    setStats(statsRes.stats);

  } catch (error) {
    toast.error(
      "Failed to load dashboard"
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDashboard();
}, []);
// Search Filter
const filteredTasks = tasks.filter((task) => {
  const searchText = search.toLowerCase();

  return (
    task.title.toLowerCase().includes(searchText) ||
    (task.description || "")
      .toLowerCase()
      .includes(searchText)
  );
});

// Create Task
const handleCreate = async (taskData) => {
  try {
    await createTask(taskData);

    toast.success("Task created successfully");

    setModalOpen(false);

    fetchDashboard();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to create task"
    );
  }
};

// Edit Task
const handleEdit = async (taskData) => {
  try {
    await updateTask(
      selectedTask._id,
      taskData
    );

    toast.success("Task updated");

    setSelectedTask(null);

    setModalOpen(false);

    fetchDashboard();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update task"
    );
  }
};

// Delete Task
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {

    await deleteTask(id);

    toast.success("Task deleted");

    fetchDashboard();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};
if (loading) {
  return <Loader />;
}

return (
  <div className="flex min-h-screen bg-slate-100">

    <Sidebar />

    <div className="flex-1">

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <main className="p-8">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Welcome back! Manage your tasks efficiently.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedTask(null);
              setModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
          >
            + Add Task
          </button>

        </div>

        <StatsCards data={stats} />

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => {
                  setSelectedTask(task);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="lg:col-span-2 xl:col-span-3">
              <EmptyState />
            </div>
          )}

        </div>

      </main>

    </div>

    <TaskModal
      isOpen={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setSelectedTask(null);
      }}
      initialData={selectedTask}
      onSubmit={
        selectedTask
          ? handleEdit
          : handleCreate
      }
    />

  </div>
);
}