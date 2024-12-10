import { Dialog, DialogTitle } from "@mui/material";

type CollabRequestDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CollaborationRequestDialog({ open, setOpen }: CollabRequestDialogProps) {
  return (
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
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          fontWeight: "bold",
          fontSize: "1.5rem",
          pl: 1,
        }}
      >
        Collaboration request sent
      </DialogTitle>
    </Dialog>
  );
}
