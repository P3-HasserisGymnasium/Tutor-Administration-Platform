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
import { useTheme, Theme } from "@mui/material/styles";
import TimeAvailability from "./TimeAvailability";
import { toast } from "react-toastify";

export default function SetTimeAvailability() {
	const [selectedDay, setSelectedDay] = useState<DayType | null>(null);
	const [startTime, setStartTime] = useState<Dayjs>(
		dayjs("2022-04-17T00:00")
	);
	const [endTime, setEndTime] = useState<Dayjs>(dayjs("2022-04-17T00:00"));
	const { setValue, getValues } = useFormContext();
	const theme = useTheme<Theme>();
	// watch state
	// const watchTimeAvailability = watch("time_availability");

	const handleAdd = () => {
		if (!selectedDay) {
			toast.error("Please select a day");
			return;
		}

		const newTimeAvailability: TimeAvailabilityType = {
			day: selectedDay,
			time: [
				{
					start_time: startTime.format("HH:mm"),
					end_time: endTime.format("HH:mm"),
				},
			],
		};

		const existingTimeAvailabilities: TimeAvailabilityType[] =
			getValues("time_availability");
		const validTimeAvailabilities = obtainValidTimeAvailabilities(
			existingTimeAvailabilities,
			newTimeAvailability
		);

		if (!validTimeAvailabilities) {
			console.error("Invalid time availability");
			toast.error("Invalid time availability");
			return;
		}
		setValue("time_availability", validTimeAvailabilities);
	};

	const timePickerStyle = {
		"& .MuiInputBase-root": {
			height: "2em", // Control the height of the input field
			fontSize: "1rem", // Adjust font size
		},
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box>
				<Typography
					variant="h4"
					sx={{
						color: theme.customColors.headingTextColor,
						paddingBottom: "0.5em",
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
							sx={{ paddingBottom: "1em" }}
							disablePortal
							onChange={(_, newValue) =>
								setSelectedDay(newValue as DayType | null)
							}
							options={Day.options}
							renderInput={(params) => (
								<TextField {...params} label="Select day" />
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
								sx={timePickerStyle}
							/>
							<DesktopTimePicker
								label="Until"
								ampm={false}
								defaultValue={dayjs("2022-04-17T00:00")}
								onChange={(newValue: Dayjs | null) => {
									if (newValue) setEndTime(newValue);
								}}
								sx={timePickerStyle}
							/>
						</Box>
					</Box>
					<Box sx={{ alignContent: "center" }}>
						{selectedDay && (
							<Button sx={{ margin: "1em" }} onClick={handleAdd}>
								Add
							</Button>
						)}
					</Box>
				</Box>
				<SelectedTimeAvailabilities
					timeAvailabilities={getValues().time_availability}
					borderColor={theme.customColors.headingTextColor}
				/>
			</Box>
		</LocalizationProvider>
	);
}

function SelectedTimeAvailabilities({
	timeAvailabilities,
	borderColor,
}: {
	timeAvailabilities: TimeAvailabilityType[];
	borderColor: string;
}) {
	return (
		<>
			{timeAvailabilities.length != 0 && (
				<Box
					sx={{
						border: "1px solid" + borderColor,
						display: "flex",
						flexDirection: "row",
						overflowX: "auto",
						overflowY: "auto",
						borderRadius: "0.5em",
						marginTop: "1em",
						maxHeight: "6em",
					}}
				>
					{timeAvailabilities.map((timeAvailability, i) => (
						<TimeAvailability
							key={i}
							timeAvailability={timeAvailability}
						/>
					))}
				</Box>
			)}
		</>
	);
}

function obtainValidTimeAvailabilities(
	existingTimeAvailabilities: TimeAvailabilityType[],
	newTimeAvailability: TimeAvailabilityType
): TimeAvailabilityType[] | undefined {
	const startTime = newTimeAvailability.time[0].start_time.split(":");
	const startTimeHourInteger = Number(startTime[0]);
	const startTimeMinutesInteger = Number(startTime[1]);
	const endTime = newTimeAvailability.time[0].end_time.split(":");
	const endTimeHourInteger = Number(endTime[0]);
	const endTimeMinutesInteger = Number(endTime[1]);

	if (!(startTimeHourInteger <= endTimeHourInteger)) return;
	if (!(startTimeMinutesInteger < endTimeMinutesInteger)) return;

	if (!existingTimeAvailabilities) return [newTimeAvailability];

	const existingSameDayTimeAvailability = existingTimeAvailabilities.find(
		(time: TimeAvailabilityType) => time.day === newTimeAvailability.day
	);
	if (!existingSameDayTimeAvailability)
		return [...existingTimeAvailabilities, newTimeAvailability];

	const equivalentTimeSlot = existingSameDayTimeAvailability?.time.find(
		(timeslot) =>
			timeslot.start_time === newTimeAvailability.time[0].start_time &&
			timeslot.end_time === newTimeAvailability.time[0].end_time
	);

	if (equivalentTimeSlot) return existingTimeAvailabilities;

	existingSameDayTimeAvailability.time.push(newTimeAvailability.time[0]);
	return [...existingTimeAvailabilities];
}
