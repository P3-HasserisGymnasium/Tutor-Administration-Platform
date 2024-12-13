import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useMeetingService } from "~/api/services/meeting-service";
import CustomButton from "~/components/content_components/CustomButton";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import { MeetingState, TimeAvailabilityType } from "~/types/data_types";
import { MeetingType, zodMeetingSchema } from "~/types/entity_types";

type RequestMeetingDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  timeAvailabilities: TimeAvailabilityType[];
};

export default function RequestMeetingDialog({ open, setOpen, timeAvailabilities }: RequestMeetingDialogProps) {
  const requestMeeting = useMeetingService().useRequestMeeting();
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs>(dayjs());
  const formMethods = useForm<MeetingType>({
    resolver: zodResolver(zodMeetingSchema),
    defaultValues: {
      collaboration: Number(useLocation().pathname.split("/")[3]),
      meeting_state: MeetingState.Enum.PENDING,
      id: 123,
      rejection_reason: "",
    },
  });
  const { getValues, register } = formMethods;

  const handleRequestMeeting = () => {
    if (!startTime || !endTime) {
      console.error("Invalid time availability");
      return;
    }

    requestMeeting.mutate(getValues());
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          display: "flex",
          flexDirection: "row",
          padding: 1,
          paddingBottom: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      <Box sx={{ width: "280px" }}>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", pr: 0 }}>Tip</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", pr: 0 }}>
          <Typography variant="body2">
            Selecting one of the tutors timeslots increases the chance of your meeting being scheduled quickly. It helps avoid conflicts and ensures
            you get the support you need at a convenient time.
          </Typography>
          <Typography fontSize={"1rem"} mt={2} fontWeight={900} variant="body2">
            Available time slots
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {timeAvailabilities?.map((timeAvailability) => (
              <TimeAvailabilityBox key={timeAvailability.day} timeAvailability={timeAvailability} />
            ))}
          </Box>
        </DialogContent>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <Box sx={{ width: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", pl: 1 }}>Request Meeting</DialogTitle>
        <DialogContent sx={{ display: "flex", pl: 1, flexDirection: "column" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography mb={1} variant="h6">
              Select a time for the meeting
            </Typography>
            <Box>
              <DateTimePicker
                {...register("start_timestamp")}
                label="Start time"
                value={startTime}
                ampm={false}
                sx={{ mb: 2 }}
                onChange={(newValue) => {
                  if (newValue) setStartTime(newValue);
                }}
              />
              <DateTimePicker
                {...register("end_timestamp")}
                label="End time"
                ampm={false}
                value={endTime}
                onChange={(newValue) => {
                  if (newValue) setEndTime(newValue);
                }}
              />
            </Box>
            <Typography mb={1} mt={3} variant="h6">
              Description of meeting (optional)
            </Typography>
            <TextField {...formMethods.register("meeting_description")} label="Description" multiline rows={4} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ paddingRight: 3 }}>
          <CustomButton onClick={handleRequestMeeting} customType="success">
            Request meeting
          </CustomButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
