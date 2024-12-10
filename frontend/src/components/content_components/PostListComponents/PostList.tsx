import { Box, Stack, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { PostType } from "~/types/entity_types";
import { PostState, Subject } from "~/types/data_types";

const mockPost: PostType = {
	id: 1,
	title: "Sample Post",
	description: "This is a sample post description.",
	subject: Subject.Enum.MATH,
	duration: [2, 4],
	state: PostState.Enum.VISIBLE,
};

export default function PostList() {
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
				<PostCard data-testid="postcard1" key={1} post={mockPost} />
			</Stack>
		</Box>
	);
}
