import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { CollaborationType } from "~/types/entity_types";
import CollaborationBox from "./admin_components/CollaborationBox";
import { usePostService } from "~/api/services/post-service";

type AdminRequestsProps = {
	collaborations: CollaborationType[] | undefined;
	isLoading: boolean;
};

export default function AdminRequests({ collaborations, isLoading }: AdminRequestsProps) {
	const { data: requests, isLoading: isRequestsLoading } = usePostService().useGetPairingRequests() as {
		data: CollaborationType[] | undefined;
		isLoading: boolean;
	};
	if (isLoading || isRequestsLoading) return <CircularProgress />;
	const allCollaborations: CollaborationType[] =
		collaborations != undefined && requests != undefined ? [...collaborations, ...requests] : [];

	return (
		<Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ pl: 3, pt: 3, height: "10%", display: "flex", alignItems: "flex-end" }}>
				<Typography variant="h1">Manage Requests</Typography>
			</Box>

			<Box sx={{ width: "100%", display: "flex", height: "80%", alignItems: "center", justifyContent: "space-evenly" }}>
				{allCollaborations?.map((collaboration, i) => {
					if (i > 2 || collaboration == undefined) return null;
					return <CollaborationBox key={collaboration.end_date + "9dh87ashda" + collaboration.tuteeId} collaboration={collaboration} />;
				})}
				{allCollaborations[0] == undefined && <Typography>No requests</Typography>}
			</Box>
			<Box sx={{ display: "flex", height: "20%", justifyContent: "flex-end", alignItems: "center", mr: 1 }}>
				<Button sx={{ height: "50px", fontSize: 18 }} variant="contained" color="primary">
					View all requests
				</Button>
			</Box>
		</Box>
	);
}
