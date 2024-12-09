import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CustomButton from "~/components/content_components/CustomButton";
type GeneralDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const ViewTutorDialog = ({ open, setOpen }: GeneralDialogProps/*, tutor: Tutor*/) => {


	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
			scroll="paper"
			PaperProps={{
				sx: {
					borderRadius: 4,
					padding: 1,
					paddingBottom: 1,
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
				},
			}}
		>
			<DialogTitle>Accepter Invitation</DialogTitle>
			<DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
				<Typography>
					dims
				</Typography>
			</DialogContent>
			<DialogActions sx={{ paddingRight: 3 }}>
				<CustomButton customType="warning">Afvis</CustomButton>
				<CustomButton customType="success">Success</CustomButton>
			</DialogActions>
		</Dialog>
	);
};

export default ViewTutorDialog;
