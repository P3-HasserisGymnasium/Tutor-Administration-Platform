import TutorCard from "./TutorCard";
import { Box, Typography, Stack } from "@mui/material";
import { Language, Subject, YearGroup } from "~/types/data_types";
import { ProfileType } from "~/types/entity_types";

export default function TutorList() {
	// const [tutors, setTutors] = useState<Tutor[]>([]);

	const profile: ProfileType = {
		full_name: "Lukas Saltenis",
		year_group: YearGroup.Enum["PRE_IB"],
		languages: [Language.Enum.Danish, Language.Enum.English],
		subjects: [Subject.Enum.MATH, Subject.Enum.PHYSICS],
		description: "I am a tutor :)",
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
