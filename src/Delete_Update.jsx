import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";

const BASE_URL = "http://localhost:3000/api";

export default function DeleteUpdate() {
  const [form, setForm] = useState({
    collection: "users",
    email: "",
    department: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      setError("");
      setMessage("");

      const res = await fetch(
        `${BASE_URL}/schoolDB/${form.collection}/${form.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ department: form.department }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Record updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      setError("");
      setMessage("");

      const res = await fetch(
        `${BASE_URL}/schoolDB/${form.collection}/${form.email}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Record deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={3}>
        Update / Delete Record
      </Typography>

      <Stack spacing={2}>
        {/* COLLECTION */}
        <TextField
          select
          label="User Type"
          name="collection"
          value={form.collection}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="users">Employee</MenuItem>
          <MenuItem value="students">Student</MenuItem>
        </TextField>

        {/* USER ID */}
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
        />

        {/* DEPARTMENT */}
        <TextField
          label="New Department (Update only)"
          name="department"
          value={form.department}
          onChange={handleChange}
          fullWidth
        />

        {/* ERROR / SUCCESS */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {message && (
          <Typography color="success.main" variant="body2">
            {message}
          </Typography>
        )}

        {/* ACTION BUTTONS */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!form.email}
          >
            Update
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!form.email}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
