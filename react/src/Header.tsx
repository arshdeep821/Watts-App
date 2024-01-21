import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import logo from './logo.png'; // Import the logo

export default function Header() {
  const progressValue = 75; // Set your progress value here

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#607d8b' }}>
        <Toolbar>
          {/* Logo and Text on the Left */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '150px', marginRight: '10px' }} />
            <Typography variant="h2" component="div">
              Watts App
            </Typography>
          </Box>

          {/* Spacer to push content to sides */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Thicker Progress with Amber Color on the Right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress
              variant="determinate"
              value={progressValue}
              size={80} // Larger size
              thickness={8} // Increased thickness
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                  color: '#eb4034', // Amber color
                },
              }}
            />
            <Typography sx={{ ml: 2, fontSize: '1.2rem' }}>
              {progressValue}% Above Goal
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

