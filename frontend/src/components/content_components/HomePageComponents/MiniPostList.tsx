//import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
//import axios from "axios";
import MiniPost from "./MiniPost";
import { PostType } from "~/types/entity_types";

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

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				gap: "16px",
				justifyContent: "start",
				padding: 2,
			}}
		>
			{posts.length > 0 ? (
				posts.map((post) => <MiniPost key={post.id} postData={post} />)
			) : (
				<Typography variant="h6">No posts found.</Typography>
			)}
		</Box>
	);
}