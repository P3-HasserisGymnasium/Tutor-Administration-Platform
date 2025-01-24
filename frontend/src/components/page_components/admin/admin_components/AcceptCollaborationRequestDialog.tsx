import { Avatar, Box, Dialog, DialogContent, DialogTitle, Grid2, Paper, Theme, Typography, useTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { CollaborationType } from "~/types/entity_types";
import { useRoleService } from "~/api/services/role-service";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import CustomButton from "~/components/content_components/CustomButton";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { Role } from "~/types/data_types";

type AcceptCollaborationRequestDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	collaboration: CollaborationType;
};

const AcceptCollaborationRequestDialog = ({ open, setOpen, collaboration }: AcceptCollaborationRequestDialogProps) => {
	const { data: tutorProfile } = useRoleService().useGetTutorProfile(collaboration.tutorId);
	const { data: tuteeProfile } = useRoleService().useGetTuteeProfile(collaboration.tuteeId);
	const { acceptCollaboration, rejectCollaboration } = useCollaborationService();
	const handleClose = () => {
		setOpen(false);
	};
	console.log("tutorprofile", tutorProfile);
	console.log("TUTOR NAME", tutorProfile?.full_name);
	console.log("tutee", tuteeProfile);
	const theme = useTheme<Theme>();

	const handleReject = () => {
		rejectCollaboration.mutate({ collaboration_id: collaboration.id, role: Role.Enum.Administrator });
	};

	const handleAccept = () => {
		acceptCollaboration.mutate({ collaboration_id: collaboration.id, role: Role.Enum.Administrator });
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
			scroll="paper"
			fullWidth
			maxWidth={"md"}
			PaperProps={{
				sx: {
					height: "80vh",
					borderRadius: 4,
					paddingBottom: 0,
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
				},
			}}
		>
			<DialogTitle
				sx={{
					display: "flex",
					backgroundColor: theme.palette.primary.main,
					width: "100%",
					height: "40px",
					color: "white  ",
					alignItems: "center",
					justifyContent: "space-between",
					padding: 0,
				}}
			>
				<Typography variant="h2" sx={{ padding: 2 }}>
					Review collaboration
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
					<CustomButton sx={{ width: "75px", height: "33px" }} customType="warning" onClick={handleReject}>
						Reject
					</CustomButton>
					<CustomButton sx={{ width: "75px", height: "33px", mr: 2 }} customType="success" onClick={handleAccept}>
						Accept
					</CustomButton>
				</Box>
			</DialogTitle>
			<DialogContent
				sx={{ display: "flex", height: "calc(100% - 40px)", p: 0, pr: 2, pl: 2, pt: 0, justifyContent: "center", alignItems: "center" }}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "50%",
						height: "100%",
						p: 0,
						mr: 2,
					}}
				>
					<Paper
						elevation={4}
						sx={{
							height: "55%",
							width: "100%",
							mb: 2,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "space-evenly",
							pl: 1,
						}}
					>
						<Grid2 container spacing={2} alignItems="center" justifyContent="start" sx={{ marginBottom: 2 }}>
							<Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
							<Typography variant="h5">{tuteeProfile?.full_name}</Typography>
						</Grid2>
						<Box sx={{ marginBottom: 2, gap: 3 }}>
							<Typography variant="body1">
								<strong>Year group:</strong> {tuteeProfile?.year_group}
							</Typography>
							<Typography variant="body1">
								<strong>Languages:</strong> {tuteeProfile?.languages.join(", ")}
							</Typography>
							<Typography variant="body1">
								<strong>Subjects receiving help in:</strong> {tuteeProfile?.subjects_receiving_help_in.join(", ")}
							</Typography>
						</Box>
					</Paper>
					<Paper elevation={4} sx={{ height: "40%", width: "100%" }}>
						<Typography variant="h5" sx={{ textAlign: "center", padding: 2 }}>
							Tutee would like help in {collaboration.subject}
						</Typography>
					</Paper>
				</Box>
				<Paper
					elevation={4}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-evenly",
						width: "50%",
						p: 1,
						height: "95%",
					}}
				>
					{/* Picture and Name Row */}
					<Grid2 container spacing={2} alignItems="center" justifyContent="start" sx={{ marginBottom: 2 }}>
						<Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
						<Typography variant="h5">{tutorProfile?.full_name}</Typography>
					</Grid2>

					{/* Info Row */}
					<Box sx={{ marginBottom: 2, gap: 3 }}>
						<Typography variant="body1">
							<strong>Year group:</strong> {tutorProfile?.year_group}
						</Typography>
						<Typography variant="body1">
							<strong>Languages:</strong> {tutorProfile?.languages?.join(", ")}
						</Typography>
						<Typography variant="body1">
							<strong>Subjects teaching:</strong> {tutorProfile?.tutoring_subjects?.join(", ")}
						</Typography>
					</Box>

					{/* Time Availability Row */}
					<Box sx={{ marginBottom: 2 }}>
						<Typography variant="body1" sx={{ fontWeight: "bold" }}>
							Time Availability:
						</Typography>
						<Grid2 container spacing={2}>
							{tutorProfile?.time_availability?.map((availability) => (
								<TimeAvailabilityBox timeAvailability={availability} />
							))}
						</Grid2>
					</Box>

					{/* Description Row */}
					<Box>
						<Typography variant="body1">{tutorProfile?.description}</Typography>
					</Box>
				</Paper>
			</DialogContent>
		</Dialog>
	);
};

export default AcceptCollaborationRequestDialog;
