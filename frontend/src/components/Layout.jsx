import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Top navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex flex-1">

        {/* Sidebar visible on all pages */}
        <Sidebar />

        {/* Page content */}
        <main className="flex-1 p-6 bg-green-50">
          <Outlet />
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}