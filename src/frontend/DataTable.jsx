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
import axios from "axios";
import { useNavigate } from "react-router";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";
const db = "schoolDB";
const collection = "users";

export default function DataTable() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    async function fetchUsers() {
        try {
            const response = await axios(
                `${BASE_URL}/${db}/${collection}/records`,
            );
            setUsers(response?.data || []);
        } catch (err) {
            console.error("Failed to fetch users: ", err);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (email) => {
        try {
            const res = await fetch(
                `${BASE_URL}/schoolDB/${collection}/${email}`,
                { method: "DELETE" },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setRefresh((prev) => !prev);
            toast.success("Record deleted successfully", {toastId: users._id});
        } catch (err) {
            toast.error(err.message, {toastId: "Error"});
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers();
    }, [refresh]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Typography variant='h6' fontWeight={600} mb={2}>
                De-Register / TC Report
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: "#f1f3f5" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>
                                Email{" "}
                                <Button sx={{ minWidth: "10px" }}>
                                    <SortByAlphaOutlinedIcon
                                        sx={{
                                            fontSize: "1rem",
                                            padding: 0,
                                            margin: 0,
                                        }}
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
                        {users?.map((ele) => (
                            <TableRow key={ele?._id}>
                                <TableCell>{ele?.Id}</TableCell>
                                <TableCell>{ele?.username}</TableCell>
                                <TableCell>{ele?.email}</TableCell>
                                <TableCell>{ele?.createdAt}</TableCell>
                                <TableCell>{ele?.dateOfBirth}</TableCell>
                                <TableCell>{ele?.department}</TableCell>
                                <TableCell>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        onClick={() => navigate("/manage")}
                                        sx={{ mb: 2, margin: "0.5rem" }}>
                                        Update
                                    </Button>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        onClick={() => handleDelete(ele?.email)}
                                        sx={{ mb: 2, margin: "0.5rem" }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
