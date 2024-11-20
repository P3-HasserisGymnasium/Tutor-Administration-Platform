import './App.css'
import { Routes, Route } from "react-router-dom"
import { Box, Typography } from '@mui/material';
import HeadText from './components/HeadText';
import { useLocation } from 'react-router-dom';
import EvenBoxLayout from './components/EvenBoxLayout';
import LongShortOnShortBoxLayout from './components/LongShortOnShortBoxLayout';
import LongShortBoxLayout from './components/LongShortBoxLayout';
import ShortOnShortLongBoxLayout from './components/ShortOnShortLongBoxLayout';

// IMPORTANT: Remember to add to this when adding a new page route
const locationNameMap = new Map<string, string>([
  ["/", "Homepage"],
  ["/test/anotherTest", "test"]
]);

export default function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Box sx={{ height: "10%", width: "100%", display: "flex", justifyContent: "left", alignItems: "center", backgroundColor: "secondary.main" }}>
        <HeadText DisplayText={getDisplayText()} />
        <Box sx={{ margin: 1, width: "calc(20% - 16px)", height: "calc(100% - 16px)", display: "flex", justifyContent: "right", alignItems: "center" }}>
          <Typography variant="h3"> ICON </Typography>
        </Box>
      </Box>
      <Box sx={{ height: "90%", width: "100%" }}>
        <Routes>
          <Route path="/" element={<ShortOnShortLongBoxLayout>
            <Typography>
              Ting
            </Typography>
            <Typography>
              Ting2
            </Typography>
            <Typography>
              Ting3
            </Typography>
          </ShortOnShortLongBoxLayout>} />
        </Routes>
        <Routes>
          <Route path="/test" element={<LongShortBoxLayout>
            <Typography>
              Ting
            </Typography>
            <Typography>
              Ting2
            </Typography>
            <Typography>
              Ting3
            </Typography>
          </LongShortBoxLayout>} />
        </Routes>
      </Box>
    </Box >
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
    return match[1];
  }

  // Regex couldn't fix
  throw new Error("Regex could not handle pathname");
}