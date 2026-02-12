import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

const BASE_URL = "http://localhost:3000/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!email.trim()) {
            return "Email ID is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            /*
        Backend OTP endpoint will be added later.
        For now, we simulate success.
      */

            setTimeout(() => {
                setMessage("OTP sent successfully to your email");
                setLoading(false);
            }, 1000);
        } catch {
            setError("Failed to send OTP. Try again.");
            setLoading(false);
        }
    };

    const onBack = () => (useNavigate(window.history.back()))

    return (
        <Box sx={{ width: "100%", maxWidth: 420, mx: "auto" }}>
            {/* BACK BUTTON */}
            <IconButton onClick={onBack} sx={{ mb: 2 }} aria-label='back'>
                <ArrowBackIcon />
            </IconButton>

            {/* BRAND */}
            <Typography variant='h4' fontWeight={700} mb={1}>
                my<span style={{ color: "#1976d2" }}>M</span>school
            </Typography>

            <Typography variant='h6'>Forgot Password?</Typography>
            <Typography variant='body2' color='text.secondary' mb={3}>
                Enter your registered Email ID to receive an OTP.
            </Typography>

            <Box component='form' onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    {/* EMAIL */}
                    <TextField
                        label='Email ID'
                        type='email'
                        placeholder='Enter Email ID'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        helperText={error}
                        fullWidth
                    />

                    {/* SUCCESS MESSAGE */}
                    {message && (
                        <Typography color='success.main' variant='body2'>
                            {message}
                        </Typography>
                    )}

                    {/* SUBMIT */}
                    <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
