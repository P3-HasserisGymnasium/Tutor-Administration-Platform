import { Box, Button, TextField, Theme, Typography, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg";
import { useAccountService } from "~/api/services/account-service";
import { AccountRegisterType } from "~/types/entity_types";

interface TutorApplicationPageProps {
  setPage: (page: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => void;
}

const TutorApplicationPage: React.FC<TutorApplicationPageProps> = ({ setPage }) => {
  const theme = useTheme<Theme>();
  const formMethods = useFormContext<AccountRegisterType>();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = formMethods;

  const navigate = useNavigate();

  const registerMutation = useAccountService().useRegisterAccount();

  const registerTutor = () => {
    const values = getValues();
    registerMutation.mutate(values, {
      onSuccess: (/*data*/) => {
        navigate("/login");
      },
      onError: (e: AxiosError) => {
        toast.error(e.code);
      },
    });
  };
  console.log("getValues", getValues());
  console.log("errors:", errors);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.customColors.postBackGroundColor,
        }}
      >
        <Box
          sx={{
            gap: 5,
            width: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            {...register("tutorProfileDescription")}
            sx={{ marginTop: 8, width: "100%" }}
            maxRows={25}
            id="tutorProfileDescription"
            label="Write your tutor description"
            variant="outlined"
            multiline
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              onClick={() => setPage("tutorTimeAvailability")}
              sx={{ margin: 1, backgroundColor: theme.customColors.headingTextColor }}
              variant="contained"
            >
              Go back
            </Button>
            <Button onClick={handleSubmit(registerTutor)} type="submit" sx={{ margin: 1 }} variant="contained">
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.main",
        }}
      >
        <img src={TutorlyLogoBlue} style={{ width: "35%" }}></img>
        <Typography variant="h3" width={"85%"}>
          <br></br>
          When you send your application, an administrator will review it.
          <br></br>
          <br></br>
          Once accepted, you can access Tutorly as a tutor.
        </Typography>
      </Box>
    </Box>
  );
};

export default TutorApplicationPage;
