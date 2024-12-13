import TutorCard from "./TutorCard";
import { Box, Typography, Stack } from "@mui/material";
import { useRoleService } from "~/api/services/role-service";
import { tutorListFilterType } from "~/types/data_types";

type TutorListProps = {
  filters: tutorListFilterType;
  filterLoading: boolean;
};


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
