// src/utils/auth.js
import { supabase } from "../supabase";

// ---------------------------
// LOGIN
// ---------------------------
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const username = data.user.user_metadata?.username || "User";
    const role = data.user.user_metadata?.role || "farmer";

    // Save user info in localStorage
    localStorage.setItem("user", JSON.stringify({ email: data.user.email, username, role }));

    return { email: data.user.email, username, role };
  } catch (err) {
    console.error("Login error:", err.message);
    return null;
  }
};

// ---------------------------
// SIGNUP
// ---------------------------
export const registerUser = async (username, email, password, role) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, role },
      },
    });
    if (error) throw error;

    localStorage.setItem("user", JSON.stringify({ email, username, role }));
    return { email, username, role };
  } catch (err) {
    console.error("Signup error:", err.message);
    return null;
  }
};

// ---------------------------
// LOGOUT
// ---------------------------
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem("user"); // clear stored user info
  } catch (err) {
    console.error("Logout error:", err.message);
  }
};

// ---------------------------
// GET USER
// ---------------------------
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ---------------------------
// CHECK AUTH
// ---------------------------
export const isAuthenticated = () => {
  return !!getUser();
};