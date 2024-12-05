import { Box, Button } from "@mui/material";
import { PostType } from "~/types/entity_types";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import SubjectChip from "../SubjectChip";

export default function PostCard({ post }: { post: PostType }) {
	const theme = useTheme<Theme>();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				backgroundColor:
					theme.customColors.collaborationBackgroundColor,
				border: "1px solid " + theme.customColors.headingTextColor,
				padding: "1em",
				borderRadius: "0.5em",
			}}
		>
			<Box
				sx={{ display: "flex", flexDirection: "column", gap: "0.4em" }}
			>
				<Typography variant="h3">{post.title}</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Typography variant="h4">Subject:</Typography>
					<SubjectChip Subject={post.subject}></SubjectChip>
				</Box>
				<Typography variant="h4">
					Duration: {post.duration} months
				</Typography>
				<Button variant="contained" sx={{ alignSelf: "flex-start" }}>
					Request Collaboration
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					paddingLeft: "1em",
				}}
			>
				<Typography variant="body1">{post.description}</Typography>
			</Box>
		</Box>
	);
}
