import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, loginUser } from "../utils/auth";

export default function Login() {
  const nav = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // LOGIN
  const handleLogin = () => {
    const success = loginUser(email, password);

    if (success) {
      nav("/dashboard");
    } else {
      alert("Invalid login. Please sign up first.");
    }
  };

  // SIGNUP
  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    registerUser(username, email, password);
    alert("Account created successfully!");
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 bg-[url('/public/images/5.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      <div className="bg-white p-10 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          AgriTech System
        </h2>

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

        {/* USERNAME → ONLY SIGNUP */}
        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            className="border p-3 w-full mb-4 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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

        {/* CONFIRM PASSWORD → ONLY SIGNUP */}
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-3 w-full mb-6 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {/* BUTTON */}
        {!isSignup ? (
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white w-full py-3 rounded"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleSignup}
            className="bg-black text-white w-full py-3 rounded"
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
