import { Box, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import CustomAutocomplete from "../CustomAutocomplete";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreationType, zodPostCreationSchema } from "~/types/data_types";
import SetDuration from "../SetDuration";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";

export default function PostCreation() {
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
    console.log(values);
  };

  return (
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
          <Typography variant="h2">Your Post</Typography>
          <Typography variant="h3">Choose title</Typography>
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
                <SetDuration />
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
          }}
        >
          <Button variant="contained" onClick={filterMethods.handleSubmit(createPost)} disabled={!(getValues("subject") && getValues("title"))}>
            Create post
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
