import { Box, Button, Typography, TextField, useMediaQuery } from "@mui/material";
import { TutorApplicationType, zodTutorApplicationSchema } from "~/types/data_types";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SetTimeAvailability from "components/content_components/SetTimeAvailability";
import SetSubject from "../SetSubject";
import { useTutorApplicationService } from "../../../api/services/tutor-application-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "~/api/authentication/useAuth";

export default function TutorApplication() {
  const { userState } = useAuth();
  const filterMethods = useForm<TutorApplicationType>({
    resolver: zodResolver(zodTutorApplicationSchema),
    defaultValues: {
      subjects: [],
      time_availability: [],
      tutor_profile_description: "",
      user_id: userState.id as number,
    },
  });
  const createApplicationMutation = useTutorApplicationService().useCreateTutorApplication();
  const navigate = useNavigate();
  const { getValues, register, control, handleSubmit } = filterMethods;
  useWatch({ control });

  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const getMaxRows = () => {
    if (isMd) {
      return 8;
    } else if (isLg) {
      return 14;
    } else {
      return 20;
    }
  };

  const handleSend = () => {
    createApplicationMutation.mutate(getValues(), {
      onSuccess: () => {
        toast.success("Application sent!");
        navigate("/tutee");
      },
    });
  };

  return (
    <FormProvider {...filterMethods}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "95%", padding: "1em" }}>
        <Typography variant="h2" sx={{ marginBottom: "1em" }}>
          Your application
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", border: "1px solid" + "black", borderRadius: "0.5em" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%", gap: "1em", paddingRight: "1em" }}>
            <Typography variant="h4">Subjects</Typography>
            <SetSubject variant="create" />

            <SetTimeAvailability />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", paddingLeft: "1em" }}>
            <Typography variant="h3">Write your application below:</Typography>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1, // Allows this box to expand to match the height of the left column
                width: "100%",
              }}
            >
              <TextField
                multiline
                fullWidth
                maxRows={getMaxRows()}
                {...register("tutor_profile_description")}
                slotProps={{
                  input: {
                    style: {
                      height: "100%", // Matches the textarea's height to its container
                      overflow: "auto", // Allows internal scrolling
                      alignItems: "flex-start", // Aligns text to the top
                    },
                  },
                }}
                sx={{
                  marginTop: "1em",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  overflowY: "auto",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1em" }}>
          {!(getValues("subjects").length > 0) ||
            (!(getValues("time_availability").length > 0) && (
              <Typography variant="body2" sx={{ color: "red" }}>
                Please select at least one subject and one time availability
              </Typography>
            ))}
          <Button
            variant="contained"
            onClick={handleSubmit(handleSend)}
            disabled={!(getValues("subjects").length > 0) || !(getValues("time_availability").length > 0)} /*onClick={handleSend}*/
          >
            Send Application
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
