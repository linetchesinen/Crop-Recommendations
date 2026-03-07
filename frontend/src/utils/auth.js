// Save users in localStorage

export const registerUser = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ username, email, password });

  localStorage.setItem("users", JSON.stringify(users));
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }

  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};
export const isAuthenticated = () => {
  return localStorage.getItem("currentUser") !== null;
};
