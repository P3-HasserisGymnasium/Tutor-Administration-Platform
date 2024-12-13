import { Chip } from "@mui/material";
import { ContactInfoType } from "~/types/data_types";
import { TutorProfileType } from "~/types/entity_types";
import { useFormContext } from "react-hook-form";

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

export function CommunicationChip({ contactInfo, deleteable }: { contactInfo: ContactInfoType; deleteable?: boolean }) {
  const { setValue, getValues } = useFormContext<TutorProfileType>();
  const deleteChip = () => {
    console.log("delete");
    const currentContactInfo = getValues("contact_info");
    setValue(
      "contact_info",
      currentContactInfo.filter((current: ContactInfoType) => current !== contactInfo)
    );
  };
  return (
    <Chip
      avatar={<Avatar alt={contactInfo.communication_medium} src={icons[contactInfo.communication_medium]} sx={{ borderRadius: "0em" }} />}
      label={contactInfo.username}
      onDelete={deleteable ? deleteChip : undefined}
      sx={{ color: "black", width: "fit-content" }}
    />
  );
}

export function CommunicationChipRead({ contactInfo }: { contactInfo: ContactInfoType }) {
  return (
    <Chip
      avatar={<Avatar alt={contactInfo.communication_medium} src={icons[contactInfo.communication_medium]} sx={{ borderRadius: "0em" }} />}
      label={contactInfo.username}
      sx={{ color: "black", width: "fit-content" }}
    />
  );
}
