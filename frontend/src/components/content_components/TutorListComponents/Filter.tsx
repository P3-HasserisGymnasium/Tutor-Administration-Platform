import {Autocomplete, Box, Button, TextField, Stack, Typography} from "@mui/material";
import {FormProvider, useForm, Controller, useWatch} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Subject, Day, YearGroup, Language, TimeAvailabilityType} from "src/types/enums";
import SetTimeAvailability from "~/components/content_components/TutorListComponents/SetTimeAvailability";
import {useState} from "react";
import TimeAvailability from "components/content_components/TimeAvailability.tsx";
import {tutorListFilterSchema, tutorListFilterType} from "src/types/types";


export default function Filter() {

	const filterMethods = useForm<tutorListFilterType>({
		resolver: zodResolver(tutorListFilterSchema),
		defaultValues: {
			subjects: [],
		}
	});

	const {getValues, control, setValue} = filterMethods;

	const allValues = getValues();

	const filter = (values: tutorListFilterType) => {
		//const tutor_list = getTutors(values);
	};
	console.log("subjects", allValues.subjects);
	console.log("values", allValues);
	const darkBlue = "#041758";
	return (
		<FormProvider {...filterMethods}>
			<Stack spacing={1} sx={{
				padding: "20px",
			}}>

				<Typography variant="h1" sx={{
					fontSize: "30px",
					color: darkBlue,
					fontWeight: "inter",
				}}>Filters</Typography>

				<Controller
					name="subjects"
					control={control}
					render={({ field }) => (
						<Autocomplete
							multiple
							options={Object.values(Subject)}
							onChange={(_, newValue) => {
								console.log("newValue", newValue);
								const newValues = allValues.subjects;
								newValues.push(newValue[0])
								setValue("subjects", newValues);
							}}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									{...params}
									variant="outlined"
									label="Subjects"
									placeholder="Select subject"
									sx={{
										"& .MuiInputLabel-root": {
											color: darkBlue,
											"&.Mui-focused": {
												color: darkBlue,
											},
										},
										"& .MuiOutlinedInput-root": {
											"& fieldset": {
												borderColor: darkBlue,
											},
											"&.Mui-focused fieldset": {
												borderColor: darkBlue,
											},
										},
									}}
								/>
							)}
						/>
					)}
				/>

				<SetTimeAvailability/>


				{allValues.time_availability && <Box sx={{border: "1px solid" + darkBlue,
				display:"flex", displayDirection:"row"}}>
					{allValues.time_availability.map((timeAvailability) => (
						<TimeAvailability timeAvailability={timeAvailability} />
					))}
				</Box>}

				<Button onClick={filterMethods.handleSubmit(filter)}>Filter
				</Button>
			</Stack>
		</FormProvider>
	)
}
