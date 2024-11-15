import './App.css'
import { Routes, Route } from "react-router-dom"
import Homepage from './components/Homepage'
import { Box, Typography } from '@mui/material';
import HeadText from './components/HeadText';

export default function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "secondary.main" }}>

      <HeadText DisplayText={'Homepage'} />

      <Box sx={{ height: "90%", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Box>
    </Box>
  );
}