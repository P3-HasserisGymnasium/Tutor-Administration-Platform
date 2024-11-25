// Import necessary icons (using Material-UI or any other icon library)
import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import GTranslateTwoToneIcon from '@mui/icons-material/GTranslateTwoTone';
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import BiotechTwoToneIcon from '@mui/icons-material/BiotechTwoTone';
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';
import SportsFootballTwoToneIcon from '@mui/icons-material/SportsFootballTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';


// Enum for subjects
/*export const Subjects = {
    MUSIC: "Music",
    MATH: "Math",
    ESS: "EScience",
    ENGLISH: "English",
    DANISH: "Danish",
    TYSK: "Tysk",
    FRENCH: "French",
    BIOLOGY:"Biology",
    CHEMISTRY:"Chemistry",
    PE: "PE",
    VA: "Visual Art",
    PSYCHOLOGY:"psychology",
    

};
*/
// Enum for Subjects
export enum Subject {
    MUSIC,
    MATH,
    ESS,
    ENGLISH,
    DANISH,
    GERMAN,
    FRENCH,
    BIOLOGY,
    CHEMISTRY,
    PE,
    VA,
    PSYCHOLOGY,
    ECON,
    SS
}

// interface for subject styling
interface subjectStyling{
    name: string;
    background: string; //defining background color
    color: string; // defining text color
    icon: React.ReactNode; //react icons

}


// Mapping colors and icons to subjects
export const SubjectColors: Record<Subject, subjectStyling> = {
    [Subject.MUSIC]: { name: "Music", background: "#b2c9e0", color: "white", icon: <MusicNoteTwoToneIcon sx={{fontSize: "2rem"}} /> },
    [Subject.MATH]: { name: "Math", background: "#ffcccb", color: "white", icon: <CalculateTwoToneIcon sx={{fontSize: "2rem",}}/> },
    [Subject.ESS]: { name: "EScience", background: "#c1e1c5", color: "white", icon: <PublicTwoToneIcon sx={{fontSize: "2rem"}} /> },
    [Subject.ENGLISH]: { name: "English", background: "#ffd700", color: "white", icon: <LanguageTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.DANISH]: { name: "Danish", background: "#FF4141", color: "white", icon: <FlagTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.GERMAN]: { name: "German", background: "#87EB8E", color: "white", icon: <GTranslateTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.FRENCH]: { name: "French", background: "#1B76FF", color: "white", icon: <TranslateTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.BIOLOGY]: { name: "Biology", background: "#98fb98", color: "white", icon: <BiotechTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.CHEMISTRY]: { name: "Chemistry", background: "#dcdcdc", color: "white", icon: <ScienceTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.PE]: { name: "PE", background: "#ffa07a", color: "white", icon: <SportsFootballTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.VA]: { name: "Visual Art", background: "#ffdead", color: "white", icon: <ColorLensTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.PSYCHOLOGY]: { name: "Psychology", background: "#dda0dd", color: "white", icon: <PsychologyAltTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.ECON]: { name: "Economy", background: "#add8e6", color: "white", icon: <PaymentsTwoToneIcon sx={{fontSize: "2rem"}}/> },
    [Subject.SS]: { name: "Social Studies", background: "#f0e68c", color: "white", icon: <Groups2TwoToneIcon sx={{fontSize: "2rem"}}/> },
};
