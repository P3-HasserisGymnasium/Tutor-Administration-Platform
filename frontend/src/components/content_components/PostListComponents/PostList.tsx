import { Box, Stack, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { PostType } from "~/types/entity_types";

export default function PostList() {
	const postDemo: PostType = {
		id: "1",
		title: "Looking for a math Tutor",
		description: "Need help with calculus",
		duration: "12",
		subject: "Math",
		state: "visible",
	};
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "1em",
				margin: "1em",
			}}
		>
			<Typography variant="h2">Filtered Posts</Typography>

			<Stack
				spacing={1}
				sx={{
					overflowY: "auto",
					marginTop: "0.5em",
				}}
			>
				<PostCard key={1} post={postDemo} />
			</Stack>
		</Box>
	);
}
