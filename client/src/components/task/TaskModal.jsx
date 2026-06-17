import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
};

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description:
          initialData.description || "",
        priority:
          initialData.priority || "Medium",
        status:
          initialData.status || "Pending",
        dueDate: initialData.dueDate
          ? initialData.dueDate.slice(0, 10)
          : "",
      });
    } else {
      setFormData(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {initialData
            ? "Edit Task"
            : "Create Task"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {initialData
                ? "Update"
                : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}