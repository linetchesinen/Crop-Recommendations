import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="font-bold text-xl">AgriTech Kenya</h1>

      <div className="flex gap-6 items-center">

        <Link to="/dashboard" className="hover:text-orange-300 transition">
          Home
        </Link>

        <Link to="/upload" className="hover:text-orange-300 transition">
          Upload
        </Link>

        <Link to="/preview" className="hover:text-orange-300 transition">
          Preview
        </Link>

        <Link to="/yield" className="hover:text-orange-300 transition">
          Yield
        </Link>

        <Link to="/crop" className="hover:text-orange-300 transition">
          Crop
        </Link>

        <Link to="/weather" className="hover:text-orange-300 transition">
          Weather
        </Link>

        <Link to="/charts" className="hover:text-orange-300 transition">
          Charts
        </Link>

        <Link
          to="/login"
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md transition"
        >
          Logout
        </Link>

      </div>

    </nav>
  );
}