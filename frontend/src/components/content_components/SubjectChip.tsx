import { Chip } from "@mui/material";
import { SubjectType } from "~/types/data_types";
import { SubjectColors } from "~/types/theme";

type SubjectChipProps = {
	Subject: SubjectType;
};

// Enum for subject colors
export default function SubjectChip({ Subject }: SubjectChipProps) {
	const style = SubjectColors[Subject];
	return (
		<Chip
			label={Subject}
			sx={{
				backgroundColor: style.background,
				color: style.color,
				fontWeight: "bold",
				fontSize: "12px",
				//display: "flex",
				alignSelf: "flex-start", // Align chip to the left
				margin: "2px",
			}}
		/>
	);
}
