//import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
//import axios from "axios";
import MiniPost from "./MiniPost";
import { PostType } from "~/types/entity_types";
import { PostState } from "~/types/data_types";

type MiniPostListProps = {
	posts: PostType[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

export default function MiniPostList({ posts, isLoading, isError }: MiniPostListProps) {
	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, width: "100%" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Typography variant="h6" color="red">
				Error fetching posts. Please refresh the page.
			</Typography>
		);
	}

	if (!posts) return <Typography variant="h6">No posts found.</Typography>;

	console.log("posts", posts);

	posts = posts.filter((post) => post.state === PostState.Enum.VISIBLE);
	console.log("postsafter", posts);
	return (
		<Box
			sx={{
				display: "flex",
				gap: "1em",
				justifyContent: "start",
				padding: 2,
				overflowY: "auto",
				height: "10em",
			}}
		>
			{posts.length > 0 ? (
				posts.slice(0, 3).map((post) => <MiniPost key={post.id} postData={post} />)
			) : (
				<Typography variant="h6">No posts found.</Typography>
			)}
		</Box>
	);
}
