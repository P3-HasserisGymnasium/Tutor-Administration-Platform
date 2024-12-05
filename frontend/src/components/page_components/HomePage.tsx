import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import React, {  } from "react";
import { Box, Button, Typography, ButtonGroup, IconButton, Tooltip} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
// import tutorTheme from "~/themes/tutorTheme";
import MeetingsList from "../content_components/MeetingList";
import MiniCalendar from "../content_components/MiniCalendar";



export default function HomePage() {
  const [view, setView] = React.useState('meeting');

  
  const handleViewChange = (newView: React.SetStateAction<string>) => {
    setView(newView);
  };


  return (
    <MediumShortOnShortBoxLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #white", 
          borderRadius: "8px",
          overflow: "hidden",
          p: 2,
          position: "relative"
          
        }}
      >
        {/* Header with Title and Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 17 }}>
          <Typography variant="h6">
            {view === 'calendar' ? "Calendar" : "Meeting List"}
          </Typography>

          {/* Button group for toggling between calendar and meeting */}
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button sx ={{ color: 'white',
            backgroundColor: view === 'meeting' ? '#6A79AA' : '#041758',
            '&:hover': {
              backgroundColor: view === 'meeting' ? 'lightblue' : 'rgba(0, 0, 255, 0.1)',}
              }} 
              onClick={() => handleViewChange('calendar')}>Show Calendar
            </Button>

            <Button
            sx ={{ color: 'white',
              backgroundColor: view === 'calendar' ? '#6A79AA' : '#041758',
              '&:hover': {
                backgroundColor: view === 'calendar' ? 'lightblue' : 'rgba(0, 0, 255, 0.1)',}
              }}
             onClick={() => handleViewChange('meeting')}>Show Meetings</Button>
          </ButtonGroup>
        
          <Tooltip title="More information" arrow>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              alignItems: "right",
            }}
            aria-label="info"
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
        </Box>
        <Box sx={{position: "flex",alignContent: "center" , alignItems: "center", width:"100%", height: "100%", border: "white 1px"}}>
        { view === 'calendar' ? (
            <MiniCalendar /> 
          ) : (
            <MeetingsList /> 
          )}
        </Box>
      </Box>

    </MediumShortOnShortBoxLayout>
  );
}
