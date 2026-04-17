import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser, getUser } from "../utils/auth";

export default function Sidebar() {
  const location = useLocation();
  const nav = useNavigate();
  const user = getUser();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    nav("/login");
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Contact Us", path: "/contact", icon: "📞" },
    { name: "Preview Data", path: "/preview", icon: "👁️" },
    { name: "Yield Prediction", path: "/yieldprediction", icon: "📊" },
    { name: "Crop Recommendation", path: "/croprecommendation", icon: "🌾" },
    { name: "Weather Forecast", path: "/weatherforecast", icon: "⛅" },
    { name: "Weather Report", path: "/weatherreport", icon: "🌡️" },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-teal-900 text-white min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-teal-900">
        {!collapsed && <h1 className="font-bold text-lg">🌾 AgriTech</h1>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-xl"
        >
          ☰
        </button>
      </div>
      {/* Navigation */}
      <div className="flex-1 p-3 space-y-2">
        {links.map((link, i) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={i}
              to={link.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition
              ${
                active
                  ? "bg-green-600"
                  : "hover:bg-green-700"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
        >
          {!collapsed ? "Logout" : "🚪"}
        </button>
      </div>
    </div>
  );
}