import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import { DatePicker, DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useMeetingService } from "~/api/services/meeting-service";
import CustomButton from "~/components/content_components/CustomButton";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import { TimeAvailabilitiesType } from "~/types/data_types";
import { MeetingType, zodMeetingSchema } from "~/types/entity_types";

type RequestMeetingDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	timeAvailabilities: TimeAvailabilitiesType[];
};

export default function RequestMeetingDialog({ open, setOpen, timeAvailabilities }: RequestMeetingDialogProps) {
	const requestMeeting = useMeetingService().useRequestMeeting();
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
	const [startTime, setStartTime] = useState<Dayjs>(dayjs("2022-04-17T00:00"));
	const [endTime, setEndTime] = useState<Dayjs>(dayjs("2022-04-17T00:00"));
	const formMethods = useForm<MeetingType>({
		resolver: zodResolver(zodMeetingSchema),
		defaultValues: {
			collaboration_id: useLocation().pathname.split("/")[3],
			state: "Pending",
			id: "123",
		},
	});
	const { setValue, getValues, register } = formMethods;

	const handleRequestMeeting = () => {
		const values = getValues();

		if (!selectedDate || !startTime || !endTime) {
			console.error("Invalid time availability");
			return;
		}

		setValue("date", {
			day: selectedDate.format("YYYY-MM-DD"),
			time: {
				start_time: startTime.format("HH:mm"),
				end_time: endTime.format("HH:mm"),
			},
		});

		requestMeeting.mutate(values, {
			onSuccess: (data) => {
				console.log("data", data);
			},
		});
	};
	const timePickerStyle = {
		"& .MuiInputBase-root": {
			height: "2em", // Control the height of the input field
			fontSize: "1rem", // Adjust font size
		},
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
						Selecting one of the tutors timeslots increases the chance of your meeting being scheduled quickly. It helps
						avoid conflicts and ensures you get the support you need at a convenient time.
					</Typography>
					<Typography fontSize={"1rem"} mt={2} fontWeight={900} variant="body2">
						Available time slots
					</Typography>
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{timeAvailabilities.map((timeAvailability) => (
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
							Select a date for the meeting
						</Typography>
						<DatePicker
							disablePast
							{...register("date")}
							onChange={(newValue: Dayjs | null) => {
								if (newValue) setSelectedDate(newValue);
							}}
							sx={{
								"& .MuiInputBase-root": {
									fontSize: "1rem",
								},
							}}
							label="Select date"
						/>
						<Typography mb={2} mt={3} variant="h6">
							Choose a duration
						</Typography>
						<Box sx={{ display: "flex", gap: 2, width: "80%" }}>
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
