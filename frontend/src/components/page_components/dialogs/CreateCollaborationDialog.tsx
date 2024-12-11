import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";


type CreateCollaborationDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateCollaborationDialog({open, setOpen}: CreateCollaborationDialogProps){

  const navigate = useNavigate();

  return(
    <Dialog
        open={open}
        onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
        scroll="paper"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            display: "flex",
            flexDirection: "col",
            padding: 1,
            paddingBottom: 1,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            overflow:"hidden",
            width: "25em",
          },
        }}
      >

        <DialogTitle sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
            fontSize: "1.5rem",
            pl: 1,
          }}
        
        > Create Collaboration</DialogTitle>

        <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1em"}}>
          <Button sx={{width:"20em"}}
            onClick={()=>{navigate("/tutee/tutor-list")}}
          
          >View tutor list</Button>
          <Button sx={{width:"20em"}}
            onClick={()=>{navigate("/tutee/request-admin")}}
          >Request admin</Button>

          <Button sx={{width:"20em"}}
          onClick={()=>{navigate("/tutee/create-post")}}
          
          >Create post</Button>
        </DialogContent>


        
      </Dialog>


  );
}