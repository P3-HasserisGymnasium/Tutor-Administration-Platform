import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { SetStateAction } from "react";
import CustomButton from "~/components/content_components/CustomButton";


type AcceptInviteDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  senderId: number; 
};


export default function AcceptInvitationDialog({open, setOpen, senderId}: AcceptInviteDialogProps){
  return(
    <Dialog
    open={open}
    onClose={() => setOpen(false)}// Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
			scroll="paper"
			PaperProps={{
				sx: {
					borderRadius: 4,
					padding: 1,
					paddingBottom: 1,
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
				},
			}}
    
    >

      <DialogTitle> {senderId} has sent an invite</DialogTitle>

      <DialogContent>
        TUtor/tutee inormation
      </DialogContent>

      <DialogActions>
      <CustomButton customType="warning">Reject</CustomButton>
      <CustomButton customType="success">Accept</CustomButton>
      </DialogActions>



    </Dialog>


  );
}