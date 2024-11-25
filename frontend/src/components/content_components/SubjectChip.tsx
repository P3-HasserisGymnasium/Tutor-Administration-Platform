import { Chip } from "@mui/material";
import { SubjectColors, SubjectType } from "~/types/data_types";

type SubjectChipProps = {
  Subject: SubjectType;
};

// Enum for subject colors
export default function SubjectChip({ Subject }: SubjectChipProps) {
  const style = SubjectColors[Subject];

  return (
    <Chip
      label={Subject}
      sx={{
        backgroundColor: style.background, // Set the background color
        color: style.color, // Set the text color
        fontWeight: "bold", // Make the text bold
        fontSize: "12px", // Set the font size
        //display: "flex",
        alignSelf: "flex-start", // Align chip to the left
        margin: "2px", // Add margin around the chip
      }}
    />
  );
}
