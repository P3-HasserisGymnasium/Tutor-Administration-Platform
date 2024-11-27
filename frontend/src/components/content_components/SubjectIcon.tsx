import { Box, Typography } from "@mui/material";
import { SubjectType } from "~/types/data_types";
import { SubjectColors } from "~/types/theme";

type SubjectIconProps = {
	Subject: SubjectType;
};

// Enum for subject colors
export default function SubjectIcon({ Subject }: SubjectIconProps) {
	const style = SubjectColors[Subject];

	return (
		<Box
			sx={{
				color: style.color,
				width: "300px",
			}}
		>
			{style.icon}
			<Typography
				variant="h6"
				sx={{ fontWeight: "bold", color: style.color }}
			>
				{style.name}
			</Typography>
		</Box>
	);
}
