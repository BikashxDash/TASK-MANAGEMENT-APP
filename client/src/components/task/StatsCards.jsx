import {
  FiClipboard,
  FiClock,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Tasks",
    value: 0,
    icon: <FiClipboard size={26} />,
    bg: "bg-indigo-500",
  },
  {
    title: "Pending",
    value: 0,
    icon: <FiClock size={26} />,
    bg: "bg-amber-500",
  },
  {
    title: "In Progress",
    value: 0,
    icon: <FiLoader size={26} />,
    bg: "bg-sky-500",
  },
  {
    title: "Completed",
    value: 0,
    icon: <FiCheckCircle size={26} />,
    bg: "bg-emerald-500",
  },
];

export default function StatsCards({ data }) {
  const values = {
    total: data?.total ?? 0,
    pending: data?.pending ?? 0,
    inProgress: data?.inProgress ?? 0,
    completed: data?.completed ?? 0,
  };

  const cards = [
    { ...stats[0], value: values.total },
    { ...stats[1], value: values.pending },
    { ...stats[2], value: values.inProgress },
    { ...stats[3], value: values.completed },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.bg} text-white p-4 rounded-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}