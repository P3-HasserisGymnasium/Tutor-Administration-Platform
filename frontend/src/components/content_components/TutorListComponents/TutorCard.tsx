import { ProfileType } from "~/types/entity_types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import avatarDemo from "./avatarDemo.png";
import SubjectChip from "components/content_components/SubjectChip.tsx";
import { SubjectType } from "~/types/data_types";
import CustomButton from "../CustomButton";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import ViewTutorDialog from "~/components/page_components/dialogs/ViewTutorDialog";
import { useState } from "react";

export default function TutorCard({ profile }: { profile: ProfileType }) {
    const theme = useTheme<Theme>();

    const [isViewTutorDialogOpen, setIsViewTutorDialogOpen] = useState(false);

    const handleViewProfile = () => {
        setIsViewTutorDialogOpen(true);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: theme.customColors.collaborationBackgroundColor,
                border: "1px solid " + theme.customColors.headingTextColor,
                padding: "1em",
                borderRadius: "0.5em",
            }}
        >
            <Avatar
                sx={{
                    borderRadius: "50%",
                    marginRight: "1em",
                    width: "4em",
                    height: "4em",
                }}
                src={avatarDemo}
                alt={profile.full_name}
            />
            <Box
                sx={{
                    marginRight: "1em",
                }}
            >
                <Typography variant="h3">
                    {profile.full_name}
                </Typography>
                <Typography variant="h4">
                    {profile.year_group}
                </Typography>
                {profile.subjects.map((subject: SubjectType, id: number) => (
                    <SubjectChip key={id} Subject={subject} />
                ))}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    alignItems: "end",
                    justifyContent: "center",
                }}
            >
                <ViewTutorDialog
                    open={isViewTutorDialogOpen}
                    setOpen={setIsViewTutorDialogOpen}
                />
                <Button onClick={handleViewProfile} variant="contained" sx={{ marginBottom: "0.5em" }}>
                    View profile
                </Button>
                <CustomButton customType="success">
                    Request collaboration
                </CustomButton>
            </Box>
        </Box>
    );
}
