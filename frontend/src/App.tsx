import './App.css'
import { Routes, Route } from "react-router-dom"
import Homepage from './components/Homepage'
import { Box, Typography } from '@mui/material';
import HeadText from './components/HeadText';
import { useLocation } from 'react-router-dom';

// IMPORTANT: Remember to add to this when adding a new page route
const locationNameMap = new Map<string, string>([
  ["/", "Homepage"],
  ["/test/anotherTest", "test"]
]);


export default function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "secondary.main" }}>

      <HeadText DisplayText={getDisplayText()} />

      <Box sx={{ height: "90%", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Box>
    </Box>
  );
}

function getDisplayText(): string {
  const location = useLocation().pathname;
  const text = locationNameMap.get(location);
  const regex = new RegExp("(?:.*[\/])(.+)$")
  if (text != undefined) {
    return text;
  }

  // Handle path not found
  const match = regex.exec(location);
  if (match != null) {
    return match[1]; //Use last capture group
  }

  // Regex couldn't fix
  throw new Error("Regex could not handle pathname");
}