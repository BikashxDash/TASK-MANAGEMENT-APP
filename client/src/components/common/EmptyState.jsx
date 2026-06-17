import { FiClipboard } from "react-icons/fi";

export default function EmptyState({
  title = "No Tasks Found",
  description = "Create your first task to get started.",
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">

        <FiClipboard
          size={40}
          className="text-indigo-600"
        />

      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="text-slate-500 mt-3">
        {description}
      </p>

    </div>
  );
}