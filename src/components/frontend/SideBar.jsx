import {
  Drawer,
  List,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
  Collapse
} from "@mui/material";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";

const drawerWidth = 240;

export default function Sidebar({ open }) {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? `${drawerWidth}px` : 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#0f172a",
          color: "#fff",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          myMschool
        </Typography>
      </Box>

      <List>

        {/* Dashboard Parent */}
        <ListItemButton
          onClick={() => setDashboardOpen(prev => !prev)}
        >
          <ListItemText primary="Dashboard" />
          {dashboardOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Nested Items */}
        <Collapse in={dashboardOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ListItemButton sx={{ pl: 4 }} onClick={() => (navigate("/signup"))}>
              <ListItemText primary="Add User" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} onClick={() => (navigate("/manage"))}>
              <ListItemText primary="Manage Users" />
            </ListItemButton>

          </List>
        </Collapse>

        {/* Other Items */}
        <ListItemButton>
          <ListItemText primary="Reports" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Students" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}
