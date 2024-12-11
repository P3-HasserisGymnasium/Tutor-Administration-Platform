import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, TextField, Typography, Box, FormControlLabel, Checkbox, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import SetDuration from "~/components/content_components/SetDuration";
import { PostType, zodPostSchema } from "~/types/entity_types";
import CustomAutocomplete from "~/components/content_components/CustomAutocomplete";
import { usePostService } from "~/api/services/post-service";

type EditPostDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
};

export default function EditPostDialog({ open, setOpen, post }: EditPostDialogProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const editPostMutation = usePostService().useEditPost();
  const useFormParameter = {
    resolver: zodResolver(zodPostSchema),
    defaultValues: {
      id: post.id,
      title: post.title,
      duration: post.duration,
      description: post.description,
      subject: post.subject,
      state: post.state,
    },
  };
  const formMethods = useForm<PostType>(useFormParameter);

  const { handleSubmit, setValue, register } = formMethods;

  const onSubmit = (data: PostType) => {
    editPostMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <FormProvider {...formMethods}>
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
          Edit Post
        </DialogTitle>

        <DialogContent sx={{ pl: 1, display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Choose title</Typography>
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                height: "28px", // Control the height of the input field
                fontSize: "1rem", // Adjust font size
                paddingY: 2.5,
                margin: 0,
              },
              "& .MuiInputLabel-root": {
                height: "2em", // Control the height of the input field
                fontSize: "1rem", //
                padding: 0,
                margin: 0,
              },
            }}
            {...register("title")}
            placeholder="Title"
          ></TextField>

          <Typography variant="h3">Select subject</Typography>

          <CustomAutocomplete initialValue={post.subject} variant="subject" sx={{ width: "50%" }} />

          <SetDuration startDuration={post.duration} />
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

          <Typography variant="h3">Descripe your request</Typography>
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "1rem", // Adjust font size
                padding: 1,
                paddingLeft: 2,
                margin: 0,
              },
              "& .MuiInputLabel-root": {
                height: "2em", // Control the height of the input field
                fontSize: "1rem", //
                padding: 0,
                margin: 0,
              },
            }}
            {...register("description")}
            placeholder="Description"
            rows={4}
            multiline={true}
            fullWidth
          ></TextField>
        </DialogContent>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ width: "10em" }} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
