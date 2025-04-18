import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Stack
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
    const [totalCars, setTotalCars] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);




    useEffect(() => {
        const fetchCars = async () => {
          try {
            const response = await axios.get('/car/getallcars'); // Make sure the route is correct
            const data = response.data;
      
            if (data?.data?.length >= 0) {
              setTotalCars(data.data.length);
              console.log("Total Cars:", data.data.length);
            }
          } catch (error) {
            console.error("Failed to fetch cars:", error);
          }
        };
      
        fetchCars();
      }, []);


      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('/users'); // Make sure this matches your backend route
            const users = response.data?.data || [];
      
            setTotalUsers(users.length-1);
            console.log("Total Users (including admins):", users.length);
          } catch (error) {
            console.error("Failed to fetch users:", error);
          }
        };
      
        fetchUsers();
      }, []);
      
      

      
      


  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8', py: 8 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Admin Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#1976d2', color: '#fff', textAlign: 'center' }}>
              <CardContent>
                <DirectionsCarIcon fontSize="large" />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total Cars
                </Typography>
                <Typography variant="h4">{totalCars}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#388e3c', color: '#fff', textAlign: 'center' }}>
              <CardContent>
                <PeopleIcon fontSize="large" />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total Users
                </Typography>
                <Typography variant="h4">{totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 6, flexWrap: 'wrap' }}
        >
          <Button variant="contained" color="primary">
          <Link to={"/adminsidebar/cartable"} style={{textDecoration:"none",color:"white"}}>       Manage Cars
          </Link>          </Button>
          <Button variant="contained" color="secondary">
          <Link to={"/adminsidebar/addcity"} style={{textDecoration:"none",color:"white"}}>       Add City
          </Link> 
          </Button>
          <Button variant="contained" color="success">
          <Link to={"/adminsidebar/addarea"} style={{textDecoration:"none",color:"white"}}>       Add Area
          </Link> 
          </Button>
          <Button variant="contained" color="warning">
          <Link to={"/adminsidebar/addstate"} style={{textDecoration:"none",color:"white"}}>       Add State
          </Link> 
          </Button>
          <Button variant="contained" color="info">
          <Link to={"/adminsidebar/usertable"} style={{textDecoration:"none",color:"white"}}>       Manage User
          </Link> 
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default AdminDashboard;