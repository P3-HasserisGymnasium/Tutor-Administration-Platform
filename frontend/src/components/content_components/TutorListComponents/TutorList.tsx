import TutorCard from "./TutorCard";
import { Box, Typography, Stack } from "@mui/material";
import { useRoleService } from "~/api/services/role-service";
import { /*Language, Subject, YearGroup,*/ tutorListFilterType } from "~/types/data_types";
//import { TutorProfileType } from "~/types/entity_types";

type TutorListProps = {
    filters: tutorListFilterType;
    filterLoading: boolean;
};

/*const profile: TutorProfileType = {
    id: 0,
    full_name: "Lukas Saltenis",
    year_group: YearGroup.Enum["PRE_IB"],
    languages: [Language.Enum.Danish, Language.Enum.English],
    tutoring_subjects: [Subject.Enum.Math, Subject.Enum.Physics],
    contact_info: [{ username: "Saltenis", communication_medium: "Discord" }],
    description: "I am a tutor :)",
    time_availability: [
        {
            day: "Monday",
            time: [
                { start_time: "08:00", end_time: "10:00" },
                { start_time: "12:00", end_time: "14:00" },
            ],
        },
        {
            day: "Tuesday",
            time: [{ start_time: "08:00", end_time: "10:00" }],
        },
    ],
};*/

export default function TutorList({ filters, filterLoading }: TutorListProps) {
    const { data: listOfTutors, isPending, isError } = useRoleService().useGetTutors(filters);
    console.log("Filters:\n", filters);
    const loading = filterLoading || isPending;


    if (isError) {
        return (
            <Typography variant="h1" color="red">
                Error fetching tutors. Please refresh the page.
            </Typography>
        );
    }

    if (loading) {
        return <Typography variant="h1">Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                padding: "1em",
            }}
        >
            <Typography variant="h2">List of Tutors</Typography>

            <Stack
                spacing={1}
                sx={{
                    overflowY: "auto",
                    marginTop: "0.5em",
                }}
            >
                {listOfTutors === undefined || listOfTutors.length === 0 ? (
                    <>
                        <Typography variant="h1">No tutors exist which match your desired filters...</Typography>
                    </>
                ) : (
                    listOfTutors.map((tutor, index) => <TutorCard key={index} profile={tutor} />)
                )}
            </Stack>
        </Box>
    );
}
