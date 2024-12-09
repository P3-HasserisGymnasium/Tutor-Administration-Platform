
import { Avatar, Box, Dialog, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction } from "react";
import { TutorProfileType } from "~/types/entity_types";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";

type TutorProfileDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
    tutorProfile: TutorProfileType;
};

const TutorProfileDialog = ({ open, setOpen, tutorProfile }: TutorProfileDialogProps) => {

    const onClose = () => {
        setOpen(false);
    }

    return (
		<Dialog
			open={open}
			onClose={onClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
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
                <Typography variant="h2">
                    Tutor Profile
                </Typography>
                <IconButton onClick={onClose} sx={{ marginLeft: "auto" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
			<DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
                <Box sx={{ width: "100%", padding: 2 }}>
                    {/* Picture and Name Row */}
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>
                        <Avatar
                            alt="User Name"
                            src="/path-to-image.jpg"
                            sx={{ width: 80, height: 80 }}
                        />
                        <Typography variant="h5">{tutorProfile.full_name}</Typography>
                    </Grid2>

                    {/* Info Row */}
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body1">
                            <strong>Year group:</strong> {tutorProfile.year_group}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Languages:</strong> {tutorProfile.languages.join(", ")}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Subjects:</strong> {tutorProfile.subjects.join(", ")}
                        </Typography>
                    </Box>

                    {/* Time Availability Row */}
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Time Availability:
                        </Typography>
                        <Grid2 container spacing={2}>
                            {tutorProfile.time_availability.map((availability) => (
                                <TimeAvailabilityBox timeAvailability={availability} />
                            ))}
                        </Grid2>
                    </Box>

                    {/* Description Row */}
                    <Box>
                        <Typography variant="body1">
                            {tutorProfile.description}
                        </Typography>
                    </Box>
                </Box>
			</DialogContent>
		</Dialog>
	);

}

export default TutorProfileDialog;