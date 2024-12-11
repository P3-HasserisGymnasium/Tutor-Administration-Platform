import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import CustomButton from "~/components/content_components/CustomButton";
import { useAuth } from "~/api/authentication/useAuth";
import { useAccountService } from "~/api/services/account-service";

type DeleteAccountDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountDialog({ open, setOpen }: DeleteAccountDialogProps) {
  // used to get the users id
  const { userState } = useAuth();
  const userId = userState.id;
  const deleteCollabMutation = useAccountService().useRemoveAccount();

  const theme = useTheme<Theme>();

  const onSubmit = () => {
    if (userId) {
      const userIdString = userId.toString();

      deleteCollabMutation.mutate(userIdString, {
        onSuccess: () => {
          setOpen(false);
          // redirect to start login page
        },
      });
    } else {
      console.error("User ID not found");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      PaperProps={{
        sx: {
          width: "26em",
          overflow: "hidden",
          borderRadius: 4,
          display: "flex",
          flexDirection: "col",
          padding: 1,
          paddingBottom: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          gap: "2em",
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
        Confirm deletion of account
      </DialogTitle>

      <DialogContent>
        <Typography variant="h3">All active collaboration will be terminated whent the account gets deleted</Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "2em",
        }}
      >
        <Button
          sx={{
            backgroundColor: theme.customColors.greyButtonColor,
            width: "10em",
          }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>

        <CustomButton sx={{ width: "10em" }} customType="warning" onClick={onSubmit}>
          Confirm
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
