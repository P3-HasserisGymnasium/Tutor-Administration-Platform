import { Avatar, Box, Dialog, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction } from "react";
import { TuteeProfileType } from "~/types/entity_types";

type ManageTuteeDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	tuteeProfile: TuteeProfileType;
};

const ManageTuteeDialog = ({ open, setOpen }: ManageTuteeDialogProps) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
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
			<DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Typography variant="h2">Tutor Profile</Typography>
				<IconButton onClick={() => setOpen(false)} sx={{ marginLeft: "auto" }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
				<Box sx={{ width: "100%", padding: 2 }}>
					{/* Picture and Name Row */}
					<Grid2 container spacing={2} alignItems="center" justifyContent="start" sx={{ marginBottom: 2 }}>
						<Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
					</Grid2>

					{/* Info Row */}
					<Box sx={{ marginBottom: 2 }}></Box>

					{/* Time Availability Row */}
					<Box sx={{ marginBottom: 2 }}>
						<Typography variant="body1" sx={{ fontWeight: "bold" }}>
							Time Availability:
						</Typography>
					</Box>

					{/* Description Row */}
					<Box></Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default ManageTuteeDialog;
