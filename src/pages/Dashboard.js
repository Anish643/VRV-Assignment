import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "react-apexcharts";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import GroupIcon from "@mui/icons-material/Group";
import SecurityIcon from "@mui/icons-material/Security";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeRoles: 0,
    inactiveRoles: 0, // New field
    permissionsAssigned: 0,
    newUsersThisWeek: 0, // New field
  });
  const [activityData, setActivityData] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]); // Data for permissions chart
  const [loading, setLoading] = useState(true);

  // Fetch initial data from APIs
  const fetchDashboardData = async () => {
    try {
      const [usersRes, rolesRes, permissionsRes] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=15"), // Mock for roles
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=20"), // Mock for permissions
      ]);

      setStats({
        totalUsers: usersRes.data.length,
        activeRoles: rolesRes.data.length,
        inactiveRoles: 5, // Mocked data
        permissionsAssigned: permissionsRes.data.length,
        newUsersThisWeek: 12, // Mocked data
      });

      // Mock activity data for charts
      const usersAdded = [5, 10, 20, 25, 30, 40, 50];
      const rolesAssigned = [3, 6, 12, 18, 24, 35, 42];
      const permissionsTrend = [15, 25, 30, 35, 50, 60, 70];
      setActivityData({ usersAdded, rolesAssigned });
      setPermissionsData(permissionsTrend);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const activityChart = {
    series: [
      {
        name: "Users Added",
        data: activityData.usersAdded || [],
      },
      {
        name: "Roles Assigned",
        data: activityData.rolesAssigned || [],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#4caf50", "#2196f3"],
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Weekly User Activities",
        align: "center",
        style: { fontSize: "16px", color: "#333" },
      },
    },
  };

  const permissionsChart = {
    series: [
      {
        name: "Permissions Assigned",
        data: permissionsData || [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#ff9800"],
      title: {
        text: "Permissions Assigned Over Time",
        align: "center",
        style: { fontSize: "16px", color: "#333" },
      },
    },
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Stats Overview */}
      <Grid container spacing={3}>
        {[
          {
            label: "Total Users",
            value: stats.totalUsers,
            icon: <GroupIcon fontSize="large" />,
            color: "#4caf50",
          },
          {
            label: "Active Roles",
            value: stats.activeRoles,
            icon: <SecurityIcon fontSize="large" />,
            color: "#2196f3",
          },
          {
            label: "Inactive Roles",
            value: stats.inactiveRoles, // New label and value
            icon: <SecurityIcon fontSize="large" />,
            color: "#f44336",
          },
          {
            label: "Permissions Assigned",
            value: stats.permissionsAssigned,
            icon: <DataUsageIcon fontSize="large" />,
            color: "#ff9800",
          },
          {
            label: "New Users This Week",
            value: stats.newUsersThisWeek, // New label and value
            icon: <PersonAddIcon fontSize="large" />,
            color: "#673ab7",
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ padding: 3, display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: stat.color,
                  color: "#fff",
                  borderRadius: "50%",
                  height: 50,
                  width: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Chart options={activityChart.options} series={activityChart.series} type="line" height={300} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Chart options={permissionsChart.options} series={permissionsChart.series} type="bar" height={300} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
