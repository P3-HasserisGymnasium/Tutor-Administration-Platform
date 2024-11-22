import { Box, Typography } from "@mui/material";
import SubjectChip from "../SubjectChip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Subject, Day, YearGroup } from "src/types/enums";

const tutorListFilterSchema = z.object({
	subjects: z.array(z.enum(Object.values(Subject) as [string, ...string[]])),
	time_availability: z.array(
		z.object({
			day: z.enum(Object.values(Day) as [string, ...string[]]),
			time_slots: z.array(
				z.object({
					start_time: z.string(),
					end_time: z.string(),
				})
			),
		})
	),
	year_group: z.enum(Object.values(YearGroup) as [string, ...string[]]),
	languages: z.array(z.string()),
});

export default function Filter() {
	const filterMethods = useForm({
		resolver: zodResolver(tutorListFilterSchema),
	});

	const { handleSubmit } = filterMethods;

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<Box
			sx={{
				backgroundColor: "rgba(251, 193, 135, 0.5)",
				border: "1px solid rgba(173, 92, 0, 1)",
				width: "200px",
				height: "150px",
				borderRadius: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 1,
			}}
		>
			<Typography
				sx={{
					fontSize: "15px",
					fontWeight: "inter",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignSelf: "flex-center",
				}}
			>
				Need help with music exam in 2 weeks
			</Typography>

			<Box>
				<SubjectChip Subject={Subject.MATH} />
			</Box>
		</Box>
	);
}
