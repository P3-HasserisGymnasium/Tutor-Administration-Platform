import { Box, Stack, Typography, Button } from "@mui/material";
import SetDuration from "../SetDuration";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubjectType, zodPostListFilterSchema } from "../../../types/data_types";
import CustomAutocomplete from "../CustomAutocomplete";
import { useAuth } from "~/api/authentication/useAuth";

export default function PostFilter({setFilters}: {setFilters:React.Dispatch<React.SetStateAction<{duration: number[], subjects: SubjectType[]}>>}) {
  const { userState } = useAuth();
  const filterMethods = useForm({
    resolver: zodResolver(zodPostListFilterSchema),
    defaultValues: {
      duration: [0, 12],
      subjects: userState?.tutoring_subjects || [],
    },
  });
  const { control, handleSubmit, getValues} = filterMethods;
  useWatch({ control });
  const filter = () => {
    const chosenSubjects = getValues("subjects");
    if (chosenSubjects.length === 0 && userState.tutoring_subjects) {
      setFilters({duration: getValues("duration"), subjects: userState.tutoring_subjects});
    } else{
      setFilters(filterMethods.getValues());
    }
  };

  return (
    <FormProvider {...filterMethods}>
      <Stack spacing={1.5} sx={{ padding: "1em", height: "95%" }}>
        <Typography variant="h2">Filters</Typography>
        <CustomAutocomplete variant="subject" multiple={true} {...(userState.tutoring_subjects && { options: userState.tutoring_subjects })} />
        <SetDuration startDuration={undefined} />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ width: "100%" }} onClick={handleSubmit(filter)}>
            Filter
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}
