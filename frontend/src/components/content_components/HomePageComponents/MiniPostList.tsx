//import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
//import axios from "axios";
import MiniPost from "./MiniPost";
import { usePostService } from "~/api/services/post-service";

export default function MiniPostList() {
	const { data: posts, isLoading, isError, refetch } = usePostService().useGetTuteePosts();

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
		<Box sx={{ padding: 4 }}>
			{/* Post grid */}
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: "16px",
					justifyContent: "start",
				}}
			>
				{safePost.length > 0 ? (
					safePost.map((post) => <MiniPost key={post.id} postData={post} />)
				) : (
					<Typography>No posts found.</Typography>
				)}
			</Box>
		</Box>
	);
}
