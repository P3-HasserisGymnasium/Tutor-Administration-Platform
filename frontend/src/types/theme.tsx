// Import necessary icons (using Material-UI or any other icon library)
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CalculateIcon from "@mui/icons-material/Calculate";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import FlagIcon from "@mui/icons-material/Flag";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import TranslateIcon from "@mui/icons-material/Translate";
import BiotechIcon from "@mui/icons-material/Biotech";
import ScienceIcon from "@mui/icons-material/Science";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PaymentsIcon from "@mui/icons-material/Payments";
import Groups2Icon from "@mui/icons-material/Groups2";

import { Subject, SubjectType } from "./data_types";

// interface for subject styling
interface subjectStyling {
  name: string;
  background: string; //defining background color
  color: string; // defining text color
  icon: React.ReactNode; //react icons
}
// Mapping colors and icons to subjects
export const SubjectColors: Record<SubjectType, subjectStyling> = {
  [Subject.Enum.Music]: {
    name: "Music",
    background: "#b2c9e0",
    color: "black",
    icon: <MusicNoteIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Math]: {
    name: "Math",
    background: "#522222",
    color: "black",
    icon: <CalculateIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Ess]: {
    name: "EScience",
    background: "#c1e1c5",
    color: "black",
    icon: <PublicIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.English]: {
    name: "English",
    background: "#ffd700",
    color: "black",
    icon: <LanguageIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Danish]: {
    name: "Danish",
    background: "#FF4141",
    color: "black",
    icon: <FlagIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.German]: {
    name: "German",
    background: "#87EB8E",
    color: "black",
    icon: <GTranslateIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.French]: {
    name: "French",
    background: "#1B76FF",
    color: "black",
    icon: <TranslateIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Biology]: {
    name: "Biology",
    background: "#98fb98",
    color: "black",
    icon: <BiotechIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Chemistry]: {
    name: "Chemistry",
    background: "#dcdcdc",
    color: "black",
    icon: <ScienceIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Pe]: {
    name: "PE",
    background: "#ffa07a",
    color: "black",
    icon: <SportsFootballIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Va]: {
    name: "Visual Art",
    background: "#ffdead",
    color: "black",
    icon: <ColorLensIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Psychology]: {
    name: "Psychology",
    background: "#522222",
    color: "white",
    icon: <PsychologyAltIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Econ]: {
    name: "Economy",
    background: "#add8e6",
    color: "black",
    icon: <PaymentsIcon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Ss]: {
    name: "Social Studies",
    background: "#f0e68c",
    color: "black",
    icon: <Groups2Icon sx={{ fontSize: "2rem" }} />,
  },
  [Subject.Enum.Physics]: {
    name: "Physics",
    background: "#f0e68c",
    color: "black",
    icon: <ScienceIcon sx={{ fontSize: "2rem" }} />,
  },
};
