import { Box, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import CustomAutocomplete from "../CustomAutocomplete";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreationType, PostState, zodPostCreationSchema } from "~/types/data_types";
import SetDuration from "../SetDuration";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import { usePostService } from "~/api/services/post-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RequestAdmin() {
	const useFormParameter = {
		resolver: zodResolver(zodPostCreationSchema),
		defaultValues: {
			title: "",
			subject: undefined,
			duration: [0, 12],
			description: "",
			state: PostState.Enum.INVISIBLE,
		},
	};
	const filterMethods = useForm<PostCreationType>(useFormParameter);
	const createPostMutation = usePostService().useCreatePost();
	const navigate = useNavigate();
	const { control, register, setValue, getValues } = filterMethods;
	useWatch({ control });

	const [checked, setChecked] = useState<boolean>(false);

	const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const isLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
	const getMaxRows = () => {
		if (isMd) {
			return 9;
		} else if (isLg) {
			return 17;
		} else {
			return 20;
		}
	};
	console.log("currnetState", getValues("state"));
	const createPost = (values: PostCreationType) => {
		console.log("values", values);

		values.state = PostState.Enum.INVISIBLE;
		createPostMutation.mutate(values, {
			onSuccess: () => {
				toast.success("Post created");
				navigate("/tutee");
			},
		});
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
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography variant="h2">Your Post</Typography>

					<Box sx={{ display: "flex", flexDirection: "row", marginTop: "1em", gap: "2em" }}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "1em",
								width: "50%",
							}}
						>
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
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column", width: "50%", alignItems: "center", gap: "1em" }}>
							<Typography variant="h3">Describe your request</Typography>
							<TextField
								multiline
								minRows={10}
								maxRows={getMaxRows()}
								variant="outlined"
								size="small"
								placeholder={"Which topics do you need help with?\n\nHow do you prefer to learn?\n\nExtra comments or notes?"}
								{...register("description")}
								sx={{ width: "100%" }}
							/>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						onClick={filterMethods.handleSubmit(createPost)}
						disabled={!(getValues("subject") && getValues("title"))}
					>
						Create post
					</Button>
				</Box>
			</Box>
		</FormProvider>
	);
}
