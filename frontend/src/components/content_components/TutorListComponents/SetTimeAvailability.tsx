import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { DayType, Day } from "~/types/data_types";
import { useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeAvailabilityType } from "~/types/data_types";
import { useState } from "react";
import { darkBlue } from "~/consts";

export default function SetTimeAvailability() {
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);
  const [startTime, setStartTime] = useState<Dayjs>(dayjs("2022-04-17T00:00"));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs("2022-04-17T00:00"));
  const { setValue, getValues } = useFormContext();

  // watch state
  // const watchTimeAvailability = watch("time_availability");

  const handleAdd = () => {
    if (selectedDay) {
      const newTimeAvailability: TimeAvailabilityType = {
        day: selectedDay,
        time: [
          {
            start_time: startTime.format("HH:mm"),
            end_time: endTime.format("HH:mm"),
          },
        ],
      };
      const previousValue = getValues("time_availability");
      if (previousValue) {
        setValue("time_availability", [...previousValue, newTimeAvailability]);
      } else {
        setValue("time_availability", [newTimeAvailability]);
      }
    } else {
      console.error("Day not selected");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography
          sx={{
            color: darkBlue,
            paddingBottom: "10px",
          }}
        >
          Time Availability
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Autocomplete
              sx={{ paddingBottom: "2em" }}
              disablePortal
              onChange={(_, newValue) =>
                setSelectedDay(newValue as DayType | null)
              }
              options={Day.options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select day"
                  sx={{
                    "& .MuiInputLabel-root": {
                      // Set the label color
                      color: darkBlue,
                      "&.Mui-focused": {
                        color: darkBlue, // Focused label color
                      },
                    },

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkBlue,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkBlue, // Focused color
                      },
                    },
                  }}
                />
              )}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <DesktopTimePicker
                label="From"
                ampm={false}
                defaultValue={dayjs("2022-04-17T00:00")}
                onChange={(newValue: Dayjs | null) => {
                  if (newValue) setStartTime(newValue);
                }}
              />
              <DesktopTimePicker
                label="Until"
                ampm={false}
                defaultValue={dayjs("2022-04-17T00:00")}
                onChange={(newValue: Dayjs | null) => {
                  if (newValue) setEndTime(newValue);
                }}
              />
            </Box>
          </Box>
          {selectedDay && (
            <Button sx={{ height: "50%" }} onClick={handleAdd}>
              Add
            </Button>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
