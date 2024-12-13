import { Chip } from "@mui/material";
import { ContactInfoType } from "~/types/data_types";
import Avatar from "@mui/material/Avatar";
import Discord from "../../assets/Discord.png";
import Email from "../../assets/Email.png";
import Microsoft_teams from "../../assets/Microsoft_teams.png";
import Skype from "../../assets/Skype.png";
import Messenger from "../../assets/Messenger.png";

const icons = {
  Discord,
  Email,
  Microsoft_teams,
  Skype,
  Messenger,
};
export default function CommunicationChip({ contactInfo }: { contactInfo: ContactInfoType }) {
  return (
    <Chip
      avatar={<Avatar alt={contactInfo.communication_medium} src={icons[contactInfo.communication_medium]} sx={{ borderRadius: "0em" }} />}
      label={contactInfo.username}
      sx={{ color: "black", fontSize: "1.5rem", p: 2, height: "2em", border: "2px solid black" }}
    />
  );
}
