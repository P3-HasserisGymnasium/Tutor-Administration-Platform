import { Box, Stack, Typography, Button } from "@mui/material";
import SetDuration from "../SetDuration";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodPostListFilterSchema } from "../../../types/data_types";
import CustomAutocomplete from "../CustomAutocomplete";

export default function PostFilter() {
  const filterMethods = useForm({
    resolver: zodResolver(zodPostListFilterSchema),
    defaultValues: {
      duration: [0, 12],
      subjects: [],
    },
  });
  const { handleSubmit } = filterMethods;
  const filter = () => {};

  return (
    <FormProvider {...filterMethods}>
      <Stack spacing={1.5} sx={{ padding: "1em", height: "95%" }}>
        <Typography variant="h2">Filters</Typography>
        <CustomAutocomplete variant="subject" multiple={true} />
        <SetDuration />
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
