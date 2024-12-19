import { Box, CircularProgress, Typography } from "@mui/material";
import { CollaborationType } from "~/types/entity_types";
import { usePostService } from "~/api/services/post-service";
import { PairingRequestBox } from "./admin_components/PairingRequestBox";
import { AwaitingCollabAcceptanceBox } from "./admin_components/AwaitingCollabAcceptanceBox";

type AdminRequestsProps = {
  awaitingAcceptanceCollabs: CollaborationType[] | undefined;
  isLoading: boolean;
};

export default function AdminRequests({ awaitingAcceptanceCollabs, isLoading }: AdminRequestsProps) {
  const { data: pairingRequests, isLoading: isRequestsLoading } = usePostService().useGetPairingRequests();
  console.log("pairing Requests", pairingRequests);
  console.log("awaitingAcceptanceCollabs", awaitingAcceptanceCollabs);

  if (isLoading || isRequestsLoading) return <CircularProgress />;

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ pl: 3, pt: 3, height: "10%", display: "flex", alignItems: "flex-end" }}>
        <Typography variant="h1">Manage Tutors</Typography>
        <Typography mb={0.5} ml={2} variant="h4">
          Click on the requests to manage them
        </Typography>
      </Box>

      <Box sx={{ width: "100%", display: "flex", height: "80%", flexDirection: "column", alignItems: "center", pt: 2, overflow: "auto" }}>
        {Array.isArray(awaitingAcceptanceCollabs) &&
          awaitingAcceptanceCollabs.map((collab, i) => {
            return <AwaitingCollabAcceptanceBox key={collab.id + i} collab={collab} />;
          })}
        {Array.isArray(pairingRequests) &&
          pairingRequests.map((request, i) => {
            return <PairingRequestBox key={request.id + i} post={request} />;
          })}
        {awaitingAcceptanceCollabs == undefined && pairingRequests == undefined && <Typography>No requests</Typography>}
      </Box>
    </Box>
  );
}
