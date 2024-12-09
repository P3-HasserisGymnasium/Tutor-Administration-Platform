//import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
//import axios from "axios";
import MiniPost from "./MiniPost";
import { PostType } from "~/types/entity_types";

type MiniPostListProps = {
	posts: PostType[] | undefined;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
};

export default function MiniPostList({ posts, isLoading, isError, refetch }: MiniPostListProps) {
	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box sx={{ textAlign: "center", marginTop: 4 }}>
				<Typography color="error">Error fetching posts. Please try again.</Typography>
				<Button onClick={() => refetch()} variant="contained" sx={{ marginTop: 2 }}>
					Retry
				</Button>
			</Box>
		);
	}

	const safePost = posts || []; // since post can be undefined

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
			{safePost.length > 0 ? (
				safePost.map((post) => <MiniPost key={post.id} postData={post} />)
			) : (
				<Typography variant="h6">No posts found.</Typography>
			)}
		</Box>
	);
}
