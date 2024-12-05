import { Avatar } from "@mui/material";

function stringAvatar(fullName: string) {
  return {
    children: `${fullName.split(' ')[0][0]}${fullName.split(' ')[1][0]}`,
  }; 
}

export default function InitialsAvatar({ fullName }: { fullName: string|null }) {
  if(fullName != null) {
    return <Avatar {...stringAvatar(fullName)} />;
  }
}

