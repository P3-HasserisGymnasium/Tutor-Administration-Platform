import { Chip } from "@mui/material";
import { SubjectType} from "~/types/data_types";
import {useTheme, Theme} from "@mui/material/styles";

// Enum for subject colors
export default function SubjectChip({ Subject }:{Subject: SubjectType} ) {
  const theme = useTheme<Theme>();

  return (
    <Chip
      label={Subject}
      sx={{
        backgroundColor: theme.customColors.subjectColors[Subject],
        fontWeight: "bold",
        fontSize: "12px",
        //display: "flex",
        alignSelf: "flex-start", // Align chip to the left
        margin: "2px",
      }}
    />
  );
}
