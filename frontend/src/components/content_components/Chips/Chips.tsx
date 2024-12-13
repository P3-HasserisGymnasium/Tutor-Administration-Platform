import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Discord from "src/assets/Discord.png";
import Email from "src/assets/Email.png";
import Microsoft_teams from "src/assets/Microsoft_teams.png";
import Skype from "src/assets/Skype.png";
import Messenger from "src/assets/Messenger.png";

export function DiscordChip({ username }: { username: string }) {
  return (
    <Chip
      avatar={<Avatar alt="Discord" src={Discord} sx={{ borderRadius: "0em" }} />}
      label={username}
      sx={{ color: "black", fontSize: "1.1rem", height: "2.5rem", p: 2 }}
    />
  );
}

export function EmailChip({ username }: { username: string }) {
  return (
    <Chip
      avatar={<Avatar alt="Email" src={Email} sx={{ borderRadius: "0em" }} />}
      label={username}
      sx={{ color: "black", fontSize: "1.1rem", height: "2.5rem", p: 2 }}
    />
  );
}

export function TeamsChip({ username }: { username: string }) {
  return (
    <Chip
      avatar={<Avatar alt="Microsoft Teams" src={Microsoft_teams} sx={{ borderRadius: "0em" }} />}
      label={username}
      sx={{ color: "black", fontSize: "1.1rem", height: "2.5rem", p: 2 }}
    />
  );
}

export function SkypeChip({ username }: { username: string }) {
  return (
    <Chip
      avatar={<Avatar alt="Skype" src={Skype} sx={{ borderRadius: "0em" }} />}
      label={username}
      sx={{ color: "black", fontSize: "1.1rem", height: "2.5rem", p: 2 }}
    />
  );
}

export function MessengerChip({ username }: { username: string }) {
  return (
    <Chip
      avatar={<Avatar alt="Messenger" src={Messenger} sx={{ borderRadius: "0em" }} />}
      label={username}
      sx={{ color: "black", fontSize: "1.1rem", height: "2.5rem", p: 2 }}
    />
  );
}
