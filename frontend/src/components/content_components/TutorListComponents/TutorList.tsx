import TutorCard from "./TutorCard";
import { Box, Typography, Stack } from "@mui/material";
import { Language, Subject, YearGroup } from "~/types/data_types";
import { TutorProfileType } from "~/types/entity_types";

export default function TutorList() {
  // const [tutors, setTutors] = useState<Tutor[]>([]);

  const profile: TutorProfileType = {
    full_name: "Lukas Saltenis",
    year_group: YearGroup.Enum["PRE_IB"],
    languages: [Language.Enum.Danish, Language.Enum.English],
    tutoring_subjects: [Subject.Enum.Math, Subject.Enum.Physics],
    contact_info: [{ username: "Saltenis", ComunicationMedium: "Discord" }],
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
  };
  /*
  useEffect(() => {
    const fetchTutors = async () => {
      const response = await fetch("http://localhost:5000/tutors");
      const data = await response.json();
      setTutors(data);
      setLoading(false);
    };

    fetchTutors();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
*/
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
        <TutorCard key={1} profile={profile} />
        <TutorCard key={2} profile={profile} />
      </Stack>
    </Box>
  );
}
