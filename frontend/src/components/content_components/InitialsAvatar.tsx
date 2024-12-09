import { Avatar} from "@mui/material";
import { SxProps, Theme } from "@mui/system";

function stringAvatar(fullName: string) {
  return {
    children: `${fullName.split(' ')[0][0]}${fullName.split(' ')[1][0]}`,
  }; 
}

export default function InitialsAvatar({sx, fullName }: {sx?: SxProps<Theme>, fullName: string|null }) {
  if(fullName != null) {
    return <Avatar sx={sx} {...stringAvatar(fullName)} />;
  } else {
    return <Avatar sx={sx} {...stringAvatar("I B")}/>;
  }
}

