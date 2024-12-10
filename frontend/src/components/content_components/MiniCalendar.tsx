// import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // Correct capitalization
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper } from "@mui/material";
// import { useMeetingService } from "~/api/services/meeting-service";

/*
interface MeetingType {
    id: number;
    title: string; // Name of the meeting
    start: string; // ISO format start time
    end?: string; // ISO format end time (optional)
  }
*/
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
        
     
      <Paper
        elevation={3}
        sx={{
          width: "95%",
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
  
    

    );

}
