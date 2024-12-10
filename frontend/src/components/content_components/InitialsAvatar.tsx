import { Avatar } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

function stringAvatar(fullName: string) {
  const nameString = fullName.includes(" ") ? `${fullName.split(" ")[0][0]}${fullName.split(" ")[1]?.[0]}` : fullName[0] + fullName[1];

  return {
    children: nameString,
  };
}

export default function InitialsAvatar({ sx, fullName }: { sx?: SxProps<Theme>; fullName: string | null }) {
  if (fullName != null) {
    return <Avatar sx={sx} {...stringAvatar(fullName)} />;
  } else {
    return <Avatar sx={sx} {...stringAvatar("I B")} />;
  }
}
