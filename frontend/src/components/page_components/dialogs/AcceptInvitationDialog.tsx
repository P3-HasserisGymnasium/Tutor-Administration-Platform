import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { SetStateAction } from "react";
import CustomButton from "~/components/content_components/CustomButton";
import { zodCollaborationSchema } from "~/types/entity_types";
import { z } from "zod";
import { useAuth } from "~/api/authentication/useAuth";
import { Role } from "~/types/data_types";



type Collaboration = z.infer<typeof zodCollaborationSchema>;

type AcceptInviteDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  collaboration: Collaboration; 
};


export default function AcceptInvitationDialog({open, setOpen, collaboration}: AcceptInviteDialogProps){

  const {userState} = useAuth();
  const senderRole = userState.role?.includes(Role.Enum.Tutee) ? "Tutor" : "Tutee";

  const senderName = ( senderRole == "Tutor")? collaboration.tutor_name : collaboration.tutee_name;

    
  return(
    <Dialog
    open={open}
    onClose={() => setOpen(false)}// Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
			scroll="paper"
      fullWidth
			PaperProps={{
				sx: {
					borderRadius: 4,
					padding: 1,
					paddingBottom: 1,
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
				},
			}}
    
    >

      <DialogTitle> {senderName} has sent an invite</DialogTitle>

      <DialogContent sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",}}>
        TUtor/tutee inormation
      </DialogContent>

      <DialogActions>
      <CustomButton customType="warning">Reject</CustomButton>
      <CustomButton customType="success">Accept</CustomButton>
      </DialogActions>



    </Dialog>


  );
}