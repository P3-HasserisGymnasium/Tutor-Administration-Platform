import { Box, Typography } from "@mui/material";

export default function PostCreationInfo() {
	const style = { textAlign: "center" };
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "1em",
				alignItems: "center",
				padding: "1em",
			}}
		>
			<Typography variant="h1" sx={style}>
				Information
			</Typography>
			<Typography variant="h3" sx={style}>
				A post is visible to tutors who are qualified to teach in the
				specific subject.
			</Typography>
			<Typography variant="h3" sx={style}>
				If a tutor wants to help you, they can send a request to you. If
				you accept their request, an administrator will review the
				potential collaboration.
			</Typography>
			<Typography variant="h3" sx={style}>
				Once an administrator accepts your joined request, the
				collaboration will be created and you can start creating
				meetings within your collaboration
			</Typography>
		</Box>
	);
}
