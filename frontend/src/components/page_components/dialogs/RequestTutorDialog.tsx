import { Box, Button, Checkbox, Dialog, FormControlLabel, TextField, Typography, useMediaQuery } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { RequestCollaborationByTutorType, TutorProfileType } from "~/types/entity_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodPostCreationSchema, PostCreationType } from "~/types/data_types";
import CustomAutocomplete from "~/components/content_components/CustomAutocomplete";
import SetDuration from "~/components/content_components/SetDuration";
import { useCollaborationService } from "~/api/services/collaboration-service";

type RequestTutorDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tutorProfile: TutorProfileType;
};

const RequestTutorDialog = ({ open, setOpen, tutorProfile }: RequestTutorDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  const requestCollaborationMutation = useCollaborationService().useRequestCollaborationViaTutor();
  const useFormParameter = {
    resolver: zodResolver(zodPostCreationSchema),
    defaultValues: {
      title: "",
      subject: undefined,
      duration: [0, 12],
      description: "",
    },
  };
  const filterMethods = useForm<PostCreationType>(useFormParameter);

  const { control, register, setValue, getValues } = filterMethods;
  useWatch({ control });

  const [checked, setChecked] = useState<boolean>(false);

  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const getMaxRows = () => {
    if (isMd) {
      return 2;
    } else if (isLg) {
      return 5;
    } else {
      return 6;
    }
  };
  const createPost = (values: PostCreationType) => {
    const body: RequestCollaborationByTutorType = {
      tutorId: tutorProfile.id,
      title: values.title,
      subject: values.subject,
      duration: checked ? undefined : values.duration,
      description: values.description,
    };
    requestCollaborationMutation.mutate(body, {
      onSuccess: () => {
        console.log("Collaboration requested");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
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
      <FormProvider {...filterMethods}>
        <Box
          sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            height: "94%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <Typography variant="h2">Request collaboration with {tutorProfile.full_name}</Typography>
            <Typography variant="h3">Title and subject</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Insert title"
              {...register("title")}
              sx={{
                minWidth: "50%",
                maxWidth: "100%",
                width: "fit-content",
              }}
            />
            <CustomAutocomplete variant="subject" sx={{ width: "50%" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {!checked && (
                <Box sx={{ width: "100%" }}>
                  {" "}
                  <SetDuration startDuration={undefined} />
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => {
                        setChecked(event.target.checked);
                        if (event.target.checked) {
                          setValue("duration", undefined);
                        } else {
                          setValue("duration", useFormParameter.defaultValues.duration);
                        }
                      }}
                    />
                  }
                  label="Unknown duration"
                  labelPlacement="start"
                />
              </Box>
            </Box>
            <Typography variant="h3">Describe your request</Typography>
            <TextField
              multiline
              maxRows={getMaxRows()}
              variant="outlined"
              size="small"
              placeholder="Which topics do you need help with?"
              {...register("description")}
              sx={{}}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button variant="contained" onClick={filterMethods.handleSubmit(createPost)} disabled={!(getValues("subject") && getValues("title"))}>
              Send request
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default RequestTutorDialog;
