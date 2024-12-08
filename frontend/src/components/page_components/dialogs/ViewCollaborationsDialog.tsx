import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import MiniCollab from "~/components/content_components/MiniCollab";
import { CollaborationType } from "~/types/entity_types";

type ViewCollaborationsDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	collaborations: CollaborationType[];
};

export default function RequestMeetingDialog({ open, setOpen, collaborations }: ViewCollaborationsDialogProps) {
	console.log("collaborations", collaborations);
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
			scroll="paper"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 4,
					padding: 1,
					paddingBottom: 1,
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
				},
			}}
		>
			<DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", pb: 0 }}>
				Your active collaborations
			</DialogTitle>
			<DialogContentText textAlign={"center"} pt={0}>
				Click on a collaboration to go the respective collaboration page
			</DialogContentText>
			<DialogContent sx={{ display: "flex", flexWrap: "wrap", gap: 2, pr: 0, justifyContent: "center" }}>
				{collaborations.map((collaboration) => (
					<MiniCollab key={collaboration.tutor_id + collaboration.tutee_name} collaboration={collaboration} />
				))}
			</DialogContent>
		</Dialog>
	);
}
