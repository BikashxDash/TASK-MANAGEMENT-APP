import {
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiLoader,
  FiSettings,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FiGrid />,
  },
  {
    title: "Pending",
    icon: <FiClock />,
  },
  {
    title: "In Progress",
    icon: <FiLoader />,
  },
  {
    title: "Completed",
    icon: <FiCheckCircle />,
  },
  {
    title: "Settings",
    icon: <FiSettings />,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-indigo-600">
          TaskFlow Pro
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage everything
        </p>
      </div>

      <nav className="flex-1 p-4">

        {menuItems.map((item) => (
          <button
            key={item.title}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition mb-2 text-slate-700"
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>{item.title}</span>
          </button>
        ))}

      </nav>

    </aside>
  );
}