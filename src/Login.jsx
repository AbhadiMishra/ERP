import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        loginType: "employee",
        email: "",
        password: "",
        department: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    /* ---------------- VALIDATION ---------------- */

    const validate = () => {
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
            toast.error("Invalid email format");
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (form.loginType === "employee" && !form.department.trim()) {
            newErrors.department = "Department is required";
        }

        return newErrors;
    };

    /* ---------------- HANDLERS ---------------- */

    const handleChange = (e) => {
      setErrors({})
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length !== 0) return;

        try {
            setLoading(true);
            setServerError("");

            const db = "schoolDB";
            const collection =
                form.loginType === "employee" ? "users" : "students";

            const response = await fetch(
                `${BASE_URL}/${db}/${collection}/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: form.email,
                        password: form.password,
                    }),
                },
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Login failed");
            toast.success("Login Success");
            navigate("/dashboard");
        } catch (err) {
            setServerError(err.message);
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Typography variant='h4' fontWeight={700} mb={1}>
                my<span style={{ color: "#1976d2" }}>M</span>school
            </Typography>

            <Typography variant='h6'>Sign in to Edunext ERP</Typography>
            <Typography variant='body2' color='text.secondary' mb={3}>
                Enter your credentials to continue
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    {/* LOGIN TYPE */}
                    <FormControl>
                        <RadioGroup
                            row
                            name='loginType'
                            value={form.loginType}
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

                    {/* EMAIL */}
                    <TextField
                        label='Email ID'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />

                    {/* PASSWORD */}
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                    />

                    {/* DEPARTMENT */}
                    {form.loginType === "employee" && (
                        <TextField
                            label='Department'
                            name='department'
                            value={form.department}
                            onChange={handleChange}
                            error={!!errors.department}
                            helperText={errors.department}
                            fullWidth
                        />
                    )}

                    {serverError && (
                        <Typography color='error' variant='body2'>
                            {serverError}
                        </Typography>
                    )}

                    {/* FORGOT */}
                    <Button
                        variant='text'
                        size='small'
                        sx={{ alignSelf: "flex-start" }}
                        onClick={() => navigate("/forgot")}>
                        Forgot Password?
                    </Button>

                    {/* SUBMIT */}
                    <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        disabled={loading}>
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>

                    {/* EXTRA LINKS */}
                    <Stack direction='row' spacing={2} justifyContent='center'>
                        <Button
                            variant='text'
                            onClick={() => navigate("/signup")}>
                            Create Account
                        </Button>
                        <Button
                            variant='text'
                            onClick={() => navigate("/manage")}>
                            Update / Delete
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
