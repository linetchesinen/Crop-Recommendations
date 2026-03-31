import User from "../models/User.js";

export const adminDashboard = async (req, res) => {

  const users = await User.find();

  res.json({
    totalUsers: users.length,
    users
  });

};