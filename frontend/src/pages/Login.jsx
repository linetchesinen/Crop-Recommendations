// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Login() {
  const nav = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("farmer");

  // ---------------------------
  // LOGIN
  // ---------------------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    // Get role and username from user_metadata
    const userRole = data.user?.user_metadata?.role || "farmer";
    const username = data.user?.user_metadata?.username || "User";

    // Store user info in localStorage so Navbar can display username
    localStorage.setItem("user", JSON.stringify({ email: data.user.email, username, role: userRole }));

    // Redirect based on role
    if (userRole === "admin") nav("/admindashboard");
    else if (userRole === "extension") nav("/extensiondashboard");
    else nav("/dashboard");
  };

  // ---------------------------
  // SIGNUP
  // ---------------------------
  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, role }, // Save username and role in metadata
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
      return;
    }

    alert("Account created successfully! Please check your email to confirm.");

    // Store user info in localStorage so Navbar can immediately show username
    localStorage.setItem("user", JSON.stringify({ email, username, role }));

    // Redirect based on role
    if (role === "admin") nav("/admindashboard");
    else if (role === "extension") nav("/extensiondashboard");
    else nav("/dashboard");
  };

  // ---------------------------
  // RESET PASSWORD
  // ---------------------------
  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset password.");
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/login",
    });

    if (error) {
      alert("Failed to send reset email: " + error.message);
    } else {
      alert(`Password reset email sent to ${email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 bg-[url('/images/5.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      <div className="bg-white p-10 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">AgriTech System</h2>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => setIsSignup(false)}
            className={!isSignup ? "font-bold border-b-2 border-green-600" : ""}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={isSignup ? "font-bold border-b-2 border-green-600" : ""}
          >
            Sign Up
          </button>
        </div>

        {/* USERNAME → Only for signup */}
        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            className="border p-3 w-full mb-4 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        {/* ROLE → Only for signup */}
        {isSignup && (
          <select
            className="border p-3 w-full mb-4 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="farmer">Farmer</option>
            <option value="extension">Extension Officer</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM PASSWORD → Only for signup */}
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-3 w-full mb-6 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {/* BUTTONS */}
        {!isSignup ? (
          <>
            <button
              onClick={handleLogin}
              className="bg-green-600 text-white w-full py-3 rounded mb-2"
            >
              Login
            </button>
            <button
              onClick={handleResetPassword}
              className="bg-yellow-500 text-white w-full py-2 rounded mb-4"
            >
              Reset Password
            </button>
          </>
        ) : (
          <button
            onClick={handleSignup}
            className="bg-black text-white w-full py-3 rounded mb-4"
          >
            Create Account
          </button>
        )}

        <Link
          to="/"
          className="block text-center mt-4 text-sm text-blue-600 hover:text-green-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}