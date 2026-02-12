import { useContext, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Stack,
} from "@mui/material";

const BASE_URL = "http://localhost:3000/api";

export default function Signup() {
    const [form, setForm] = useState({
        type: "employee",
        username: "",
        email: "",
        password: "",
        department: "",
        DOB: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");

    const handleChange = (e) => {
        e.stopPropagation();
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password || !form.DOB) {
            setError("All required fields must be filled");
            return;
        }

        if (form.type === "employee" && !form.department) {
            setError("Department is required for employee");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const db = "schoolDB";
            const collection = form.type === "employee" ? "users" : "students";

            const payload =
                form.type === "employee"
                    ? {...form, dob: form.DOB}
                    : {
                          username: form.username,
                          email: form.email,
                          password: form.password,
                          dob: form.DOB,
                      };

            const res = await fetch(`${BASE_URL}/${db}/${collection}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setSuccess("Account created successfully");
            setForm({
                type: "employee",
                username: "",
                email: "",
                password: "",
                department: "",
                DOB: "",
            });
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 420, mx: "auto" }}>
            <Typography variant='h5' fontWeight={600} mb={3}>
                Create Account
            </Typography>

            <Box component='form' onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    {/* TYPE */}
                    <FormControl>
                        <RadioGroup
                            row
                            name='type'
                            value={form.type}
                            onChange={handleChange}>
                            <FormControlLabel
                                value='employee'
                                control={<Radio />}
                                label='Employee'
                            />
                            <FormControlLabel
                                value='student'
                                control={<Radio />}
                                label='Student'
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* USERNAME */}
                    <TextField
                        label='Username'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* EMAIL */}
                    <TextField
                        label='Email'
                        type='email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* PASSWORD */}
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Date od Birth */}
                    <TextField
                        label='Date of Birth'
                        type={form.DOB ? "date" : "text"}
                        name='DOB'
                        value={form.DOB}
                        onChange={handleChange}
                        onFocus={() => setType("date")}
                        onBlur={() => {
                            if (!form.DOB) setType("text");
                        }}
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                    />

                    {/* DEPARTMENT */}
                    {form.type === "employee" && (
                        <TextField
                            label='Department'
                            name='department'
                            value={form.department}
                            onChange={handleChange}
                            fullWidth
                        />
                    )}

                    {/* ERROR / SUCCESS */}
                    {error && (
                        <Typography color='error' variant='body2'>
                            {error}
                        </Typography>
                    )}

                    {success && (
                        <Typography color='success.main' variant='body2'>
                            {success}
                        </Typography>
                    )}

                    {/* SUBMIT */}
                    <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        disabled={loading}>
                        {loading ? "Creating..." : "Sign Up"}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
