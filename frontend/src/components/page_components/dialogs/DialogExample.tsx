import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { PostType } from "~/types/entity_types";
import CustomButton from "~/components/content_components/CustomButton";
import MiniPost from "~/components/content_components/MiniPost";
import { Subject } from "~/types/data_types";

type GeneralDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const examplePost: PostType = {
  id: "12345",
  title: "Introduction to Algebra",
  description:
    "A session focused on the fundamentals of algebra, including solving equations, graphing, and simplifying expressions.",
  subject: Subject.Enum.French,
  duration: "1 hour",
  state: "active",
};
const GeneralDialog = ({ open, setOpen }: GeneralDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
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
      <DialogTitle>Accepter Invitation</DialogTitle>
      <DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
        <MiniPost postData={examplePost} />
        <MiniPost postData={examplePost} />
        <MiniPost postData={examplePost} />
      </DialogContent>
      <DialogActions sx={{ paddingRight: 3 }}>
        <CustomButton customType="warning">Afvis</CustomButton>
        <CustomButton customType="success">Success</CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralDialog;
