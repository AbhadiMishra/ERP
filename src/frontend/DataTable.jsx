import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Paper,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import { toast } from "react-toastify";
import {
    fetchUsers,
    deleteUser,
    clearError,
    clearSuccessMessage,
} from "../storeRedux/slices.js";

export default function DataTable({ sendCount }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const { users, loading, actionLoading, error, actionError, successMessage } =
        useSelector((state) => state.user);

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(7);

    // Sorting state
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortedUsers, setSortedUsers] = useState([]);

    // Calculate pagination indexes
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    /* ---------------- EFFECTS ---------------- */

    useEffect(() => {
        // Fetch users on component mount
        dispatch(fetchUsers({ collection: "users", db: "schoolDB" }));
    }, [dispatch]);

    useEffect(() => {
        // Update sorted users when users change
        setSortedUsers(users);
    }, [users]);

    useEffect(() => {
        // Send count to parent
        if (sendCount) {
            sendCount(users.length);
        }
    }, [users.length, sendCount]);

    useEffect(() => {
        // Handle errors
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (actionError) {
            toast.error(actionError);
            dispatch(clearError());
        }
    }, [error, actionError, dispatch]);

    useEffect(() => {
        // Handle success messages
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearSuccessMessage());
        }
    }, [successMessage, dispatch]);

    /* ---------------- HANDLERS ---------------- */

    const handleDelete = async (email) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteUser({ collection: "users", email }));
        }
    };

    const handleSortByEmail = () => {
        const sorted = [...sortedUsers].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.email.localeCompare(b.email);
            } else {
                return b.email.localeCompare(a.email);
            }
        });

        setSortedUsers(sorted);
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    /* ---------------- UI ---------------- */

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Employees Record
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: "#f1f3f5" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>

                            {/* Email Sorting */}
                            <TableCell>
                                Email
                                <Button
                                    sx={{ minWidth: "10px" }}
                                    onClick={handleSortByEmail}
                                >
                                    <SortByAlphaOutlinedIcon
                                        sx={{ fontSize: "1rem" }}
                                    />
                                </Button>
                            </TableCell>

                            <TableCell>Created</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Apply Pagination */}
                        {sortedUsers.slice(startIndex, endIndex).map((ele) => (
                            <TableRow key={ele?._id}>
                                <TableCell>{ele?.Id}</TableCell>
                                <TableCell>{ele?.username}</TableCell>
                                <TableCell>{ele?.email}</TableCell>

                                {/* Format Dates */}
                                <TableCell>
                                    {new Date(ele?.createdAt).toLocaleDateString()}
                                </TableCell>

                                <TableCell>
                                    {new Date(ele?.dateOfBirth).toLocaleDateString()}
                                </TableCell>

                                <TableCell>{ele?.department}</TableCell>

                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => navigate("/manage")}
                                        sx={{ m: 0.5 }}
                                        disabled={actionLoading}
                                    >
                                        Update
                                    </Button>

                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(ele?.email)}
                                        sx={{ m: 0.5 }}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? "..." : "Delete"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Simple Pagination Controls */}
            <Box mt={2}>
                <Button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Previous
                </Button>

                <Typography component="span" sx={{ mx: 2 }}>
                    Page {page}
                </Typography>

                <Button
                    disabled={endIndex >= sortedUsers.length}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}
