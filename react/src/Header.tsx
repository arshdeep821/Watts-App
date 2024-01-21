import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import logo from './logo.png'; // Import the logo

export default function Header() {
  const progressValue = 67; // Set your progress value here

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#607d8b' }}>
        <Toolbar>
          {/* Logo and Text on the Left */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '150px', marginRight: '10px' }} />
            <Typography variant="h2" component="div">
              WattsApp
            </Typography>
          </Box>

          {/* Spacer to push content to sides */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Larger Progress on the Right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress
              variant="determinate"
              value={progressValue}
              size={80} // Larger size
              thickness={4} // Adjust thickness
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Typography sx={{ ml: 2, fontSize: '1.9rem' }}> {/* Larger font size */}
              {progressValue}% Below Goal
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
