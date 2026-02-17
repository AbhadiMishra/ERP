import User from "../models/user.js";

// 1️⃣ Signup
export const signUp = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Record already exists");

  const user = await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    department: data.department,
    dateOfBirth: data.dob,
  });

  return { message: "Record inserted successfully", id: user._id };
};

// 2️⃣ Login
export const signIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  return {
    message: "Login successful",
    id: user._id,
    username: user.username,
  };
};

// 3️⃣ Update
export const updateRecord = async (email, updates) => {
  const user = await User.findOneAndUpdate(
    { email },
    updates,
    { new: true }
  );

  if (!user) throw new Error("Record not found");

  return { message: "Record updated" };
};

// 4️⃣ Delete
export const deleteRecord = async (email) => {
  const result = await User.deleteOne({ email });

  if (result.deletedCount === 0)
    throw new Error("Record not found");

  return { message: "Record deleted" };
};

// 5️⃣ Get All Users
export const getUsers = async () => {
  return User.find();
};
