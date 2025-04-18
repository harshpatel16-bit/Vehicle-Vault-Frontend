import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2'


const AdminWelcome = () => {
     const handleLogout = () => {
         swal.fire({
                    title: "success",
                    icon: "success",
                    text:"Sign Out Successfull!!",
                    showConfirmButton: false,
                    timer:1500
        
                  });
        // Remove user data from localStorage
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        // localStorage.removeItem("compareCars");
    
        // Redirect to login page
       
      };
  return (
    <Box
      sx={{
        minHeight: '90vh',
        backgroundColor: '#f0f4f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        p: 4
      }}
    >
      <EmojiEventsIcon sx={{ fontSize: 80, color: '#1976d2', mb: 2 }} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome, Admin!
      </Typography>
      <Typography variant="h6" color="text.secondary" maxWidth="600px">
        You have successfully logged into the admin panel. From here, you can manage cars, users, bookings, and much more. Let's keep everything running smoothly!
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary">
            <Link to={"/adminsidebar/dashboard"} style={{textDecoration:"none",color:"white"}}>          Go to Dashboard
            </Link>
        </Button>
        <Button variant="outlined" color="error" startIcon={<LogoutIcon />}>
        <Link onClick={handleLogout}  to={"/login"} style={{textDecoration:"none",color:"#d32f2f"}}>
                      
        Logout
         </Link>
          
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminWelcome;
