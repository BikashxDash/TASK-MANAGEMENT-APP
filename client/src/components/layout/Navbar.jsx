import { FiBell, FiSearch, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({
  search,
  setSearch,
}) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-indigo-600">
          TaskFlow Pro
        </h1>

        <p className="text-sm text-slate-500">
          Manage your daily tasks
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-[380px]">

        <FiSearch className="text-slate-500 mr-2" />

        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-transparent outline-none w-full"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="relative">

          <FiBell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] px-1">
            2
          </span>

        </button>

        <div className="hidden md:block text-right">

          <h3 className="font-semibold">
            {user?.name || "User"}
          </h3>

          <p className="text-xs text-slate-500">
            {user?.email}
          </p>

        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </header>
  );
}