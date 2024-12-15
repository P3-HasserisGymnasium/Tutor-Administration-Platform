import { Box, Button } from "@mui/material";
import { PostType, RequestCollaborationByPostType } from "~/types/entity_types";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import SubjectChip from "../SubjectChip";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useAuth } from "~/api/authentication/useAuth";

export default function PostCard({ post }: { post: PostType }) {
	const { userState } = useAuth();
	const requestCollaborationMutation = useCollaborationService().useRequestCollaborationViaPost();

	const theme = useTheme<Theme>();

	const handleRequestCollaboration = () => {
		const body: RequestCollaborationByPostType = {
			post_id: post.id,
			tutor_id: userState?.id || 0,
		};
		requestCollaborationMutation.mutate(body, {
			onSuccess: () => {},
			onError: (error) => {
				console.error(error);
			},
		});
	};
	return (
		<Box
			data-testid="postcard1"
			sx={{
				display: "flex",
				flexDirection: "row",
				backgroundColor: theme.customColors.collaborationBackgroundColor,
				border: "1px solid " + theme.customColors.headingTextColor,
				padding: "1em",
				borderRadius: "0.5em",
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", gap: "0.4em" }}>
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
				<Typography variant="h4">{getDuration(post.duration)}</Typography>
				<Button variant="contained" sx={{ alignSelf: "flex-start" }} onClick={handleRequestCollaboration}>
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

function getDuration(duration: number[] | undefined | null) {
	if (duration === undefined || duration === null) {
		return "Duration not specified";
	} else if (duration[0] === duration[1]) {
		return `Duration: ${duration[0]} months`;
	} else {
		return `Duration: ${duration[0]}-${duration[1]} months`;
	}
}
