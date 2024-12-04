import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // Correct capitalization
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Paper, Typography } from "@mui/material";
import { useMeetingService } from "~/api/services/meeting-service";

interface MeetingType {
    id: number;
    title: string; // Name of the meeting
    start: string; // ISO format start time
    end?: string; // ISO format end time (optional)
  }

export default function MiniCalendar(){

    /*const {getMeetings} = useMeetingService();
    console.log("getMeetings data:", getMeetings.data);


    const event = getMeetings.data
    ? getMeetings.data.map((meeting) => ({
        id: meeting.id,
        title: meeting.collaboration_id, 
        start: new Date(meeting.start_date).toString(), 
        end: new Date(meeting.end_date).toString(), 
      }))
    : [];
    
    
    useEffect(() => {
        console.log(getMeetings.data);
    }, [getMeetings.data]);*/
    

   
    return(
        <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        height: "100vh",
        backgroundColor: "#f5f5f5", // Optional: Light gray background
      }}
    >
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate="2024-12-01" 
          //events = {event}     
          headerToolbar={{
            start: "today prev,next", // Left side buttons
            center: "title", // Centered title
            end: "dayGridMonth,timeGridWeek,timeGridDay", // Right side buttons
          }}
          
          height="75vh"
          
        />
      </Paper>
    </Box>
    

    );

}
