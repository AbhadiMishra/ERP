import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: String,
    dateOfBirth: Date,
    role: {
      type: String,
      enum: ["admin", "employee", "student"],
      default: "employee",
    },
  },
  { timestamps: true }
);

// 🔐 Hash password automatically
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// 🔐 Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
