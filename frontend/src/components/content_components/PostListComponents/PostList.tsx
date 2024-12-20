import { Box, Stack, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { PostState, SubjectType } from "~/types/data_types";
import { usePostService } from "~/api/services/post-service";
import { CircularProgress } from "@mui/material";

export default function PostList({ filters, loading }: { filters: { duration: number[]; subjects: SubjectType[] }; loading: boolean }) {
	const { data: postlist, isError } = usePostService().useGetPosts(filters);
	const posts = postlist?.filter((post) => post.state === PostState.Enum.VISIBLE);

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 4, width: "100%", height: "90%" }}>
				<CircularProgress size={100} />
			</Box>
		);
	}

	if (isError) {
		return (
			<Typography variant="h6" color="red">
				Error fetching posts. Please refresh the page.
			</Typography>
		);
	} else
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1em",
					margin: "1em",
					height: "100%",
				}}
			>
				<Typography variant="h2">Filtered Posts</Typography>

				{posts?.length === 0 && <Typography variant="h2">No posts found</Typography>}

				<Stack
					spacing={1}
					sx={{
						maxHeight: "100%",
						height: "90%",
						overflowY: "scroll",
						marginTop: "0.5em",
					}}
				>
					{posts?.map((post) => {
						return <PostCard key={post.id} post={post} />;
					})}
				</Stack>
			</Box>
		);
}
