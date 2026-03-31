import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("farmer");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedUser || loggedUser.role !== "admin") {
      nav("/login");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // ADD USER
  const addUser = () => {
    if (!name || !email) {
      alert("Fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: name,
      email: email,
      role: role,
      status: "active",
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    setName("");
    setEmail("");
  };

  // DELETE USER
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    saveUsers(updatedUsers);
  };

  // ACTIVATE / DEACTIVATE USER
  const toggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    );

    saveUsers(updatedUsers);
  };

  // CHANGE ROLE
  const changeRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );

    saveUsers(updatedUsers);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    nav("/");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ADD USER FORM */}

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-bold mb-3">Add User</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="farmer">Farmer</option>
            <option value="extension">Extension Officer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={addUser}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* USER TABLE */}

      <table className="w-full border">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border text-center">
              <td className="p-2">{user.username}</td>

              <td>{user.email}</td>

              <td>
                <select
                  value={user.role}
                  onChange={(e) => changeRole(user.id, e.target.value)}
                  className="border p-1"
                >
                  <option value="farmer">Farmer</option>
                  <option value="extension">Extension</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td>
                <span
                  className={
                    user.status === "active"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {user.status}
                </span>
              </td>

              <td className="flex gap-2 justify-center p-2">
                <button
                  onClick={() => toggleStatus(user.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}