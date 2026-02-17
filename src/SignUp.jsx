// import { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useState, useEffect } from "react";
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
import { signupUser, clearError, clearSuccessMessage } from "./storeRedux/slices.js";

export default function Signup() {
    const dispatch = useDispatch();

    // Redux state
    const { loading, error, successMessage } = useSelector(
        (state) => state.user
    );

    const [form, setForm] = useState({
        type: "employee",
        username: "",
        email: "",
        password: "",
        department: "",
        DOB: "",
    });

    /* ---------------- EFFECTS ---------------- */

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearSuccessMessage());
            // Reset form on success
            setForm({
                type: "employee",
                username: "",
                email: "",
                password: "",
                department: "",
                DOB: "",
            });
        }
    }, [successMessage, dispatch]);

    /* ---------------- HANDLERS ---------------- */

    const handleChange = (e) => {
        e.stopPropagation();
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password || !form.DOB) {
            toast.error("All required fields must be filled", {
                toastId: "fieldEmpty",
            });
            return;
        }

        if (form.type === "employee" && !form.department) {
            toast.error("Department is required for employee", {
                toastId: "DeptEmpty",
            });
            return;
        }

        // Dispatch Redux action
        dispatch(signupUser(form));
    };

    /* ---------------- UI ---------------- */

    return (
        <Box sx={{ width: "100%", maxWidth: 420, mx: "auto" }}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                Create Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    {/* TYPE */}
                    <FormControl>
                        <RadioGroup
                            row
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="employee"
                                control={<Radio />}
                                label="Employee"
                            />
                            <FormControlLabel
                                value="student"
                                control={<Radio />}
                                label="Student"
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* USERNAME */}
                    <TextField
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* EMAIL */}
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* PASSWORD */}
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Date of Birth */}
                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="DOB"
                        value={form.DOB || ""}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />

                    {/* DEPARTMENT */}
                    {form.type === "employee" && (
                        <TextField
                            label="Department"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            fullWidth
                        />
                    )}

                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
