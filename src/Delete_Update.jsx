import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import {
    updateUser,
    deleteUser,
    clearError,
    clearSuccessMessage,
} from "./storeRedux/slices.js";

export default function DeleteUpdate() {
    const dispatch = useDispatch();

    // Redux state
    const { actionLoading, actionError, successMessage } = useSelector(
        (state) => state.user
    );

    const [form, setForm] = useState({
        collection: "users",
        email: "",
        department: "",
    });

    /* ---------------- EFFECTS ---------------- */

    useEffect(() => {
        if (actionError) {
            toast.error(actionError);
            dispatch(clearError());
        }
    }, [actionError, dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearSuccessMessage());
        }
    }, [successMessage, dispatch]);

    /* ---------------- HANDLERS ---------------- */

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async () => {
        if (!form.email) {
            toast.error("Email is required");
            return;
        }

        if (!form.department) {
            toast.error("Department is required for update");
            return;
        }

        dispatch(
            updateUser({
                collection: form.collection,
                email: form.email,
                updates: { department: form.department },
            })
        );
    };

    const handleDelete = async () => {
        if (!form.email) {
            toast.error("Email is required");
            return;
        }

        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(
                deleteUser({
                    collection: form.collection,
                    email: form.email,
                })
            );
        }
    };

    /* ---------------- UI ---------------- */

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

                {/* ACTION BUTTONS */}
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={handleUpdate}
                        disabled={!form.email || actionLoading}
                    >
                        {actionLoading ? "Updating..." : "Update"}
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={!form.email || actionLoading}
                    >
                        {actionLoading ? "Deleting..." : "Delete"}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
