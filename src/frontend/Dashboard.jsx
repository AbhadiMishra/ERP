import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router";

// const drawerWidth = 240;

export default function Dashboard() {
    const [open, setOpen] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        document.body.classList.add("dashboard");
        return () => document.body.classList.remove("dashboard");
    }, []);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fb"}}>
            <Sidebar open={open} />

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    margin: `20px`
                }}>
                <Button
                    size='small'
                    variant='contained'
                    onClick={() => setOpen(!open)}
                    sx={{ mb: 2, margin: "10px"}}>
                    Menu
                </Button>

                <Button
                    size='small'
                    variant='contained'
                    onClick={() => (navigate("/signup"))}
                    sx={{ mb: 2 , margin: "10px"}}>
                    Add Users
                </Button>

                {/* DASHBOARD SUMMARY (easy to replace later) */}
                <Grid container spacing={2} mb={3}>
                    <Grid  size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant='h4'>1844</Typography>
                            <Typography color='text.secondary'>
                                Total Students
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid  size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant='h4'>96</Typography>
                            <Typography color='text.secondary'>
                                De-Registered
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid  size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant='h4'>16</Typography>
                            <Typography color='text.secondary'>
                                Transfer Certificates
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* MAIN TABLE */}
                <DataTable />
            </Box>
        </Box>
    );
}