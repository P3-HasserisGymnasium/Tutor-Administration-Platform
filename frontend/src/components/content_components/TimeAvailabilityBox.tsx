import { Box, Typography } from "@mui/material";
import { TimeAvailabilityType, TimeSlotType } from "~/types/data_types";

export default function TimeAvailabilityBox({ timeAvailability }: { timeAvailability: TimeAvailabilityType }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				border: "1px solid black",
				borderRadius: "0.5em",
				padding: "0.5em",
				margin: "0.5em",
				position: "relative",
				textAlign: "center",
				height: "fit-content",
				width: "fit-content",
			}}
		>
			<Typography variant="h4">{timeAvailability?.day}</Typography>
			{timeAvailability.time.map((timeSlot:TimeSlotType, index:number) => (
				<Typography key={`${timeSlot.start_time}-${index}`} variant="body1" id={String(index)} sx={{ color: "black" }}>
					{timeSlot.start_time}-{timeSlot.end_time}
				</Typography>
			))}
		</Box>
	);
}
