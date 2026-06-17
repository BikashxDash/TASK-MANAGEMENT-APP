import {
  FiCalendar,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const priorityColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-100 text-yellow-600",
  Low: "bg-green-100 text-green-600",
};

const statusColors = {
  Pending: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start">

        <h2 className="text-lg font-semibold text-slate-800">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priorityColors[task.priority] ||
            "bg-slate-100 text-slate-600"
          }`}
        >
          {task.priority}
        </span>

      </div>

      {/* Description */}
      <p className="text-slate-500 mt-4 line-clamp-3">
        {task.description || "No description added."}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <FiCalendar />

          <span>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No Due Date"}
          </span>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[task.status] ||
            "bg-slate-100 text-slate-600"
          }`}
        >
          {task.status}
        </span>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          <FiEdit2 />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FiTrash2 />
          Delete
        </button>

      </div>

    </div>
  );
}