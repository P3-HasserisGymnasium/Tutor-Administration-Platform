import {useState} from "react";
import TutorCard from "./TutorCard";
import {Box, Typography,Stack} from "@mui/material";
import {Language, Subject, YearGroup} from "~/types/enums.ts";
import {Profile} from "api/services/roleService.ts";



export default function TutorList() {
    const darkbBlue = "#041758";
 // const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const Profile:Profile = {
    full_name: "Lukas Saltenis",
    year_group: YearGroup.PREIB,
    languages: [Language.DANISH, Language.ENGLISH],
    subjects: [Subject.MATH,Subject.PHYSICS],
    description: "I am a tutor"
  }
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
    <Box sx={{
      padding: "20px",
    }}>
      <Typography variant="h1" sx={{
        fontSize: "30px",
        color: darkbBlue,
        fontWeight: "inter",
      }}>List of Tutors</Typography>

      <Stack spacing={1} sx={{
        overflowY:"auto"}}>
        <TutorCard profile={Profile}/>
        <TutorCard profile={Profile}/>

      </Stack>

    </Box>
  );
}