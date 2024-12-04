import { Box, Button, Theme, Typography, useTheme } from "@mui/material";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg";
import { useFormContext, useWatch } from "react-hook-form";
import { AccountRegisterType } from "~/types/entity_types";
import SetSubject from "../content_components/SetSubject";
import SetTimeAvailability from "../content_components/SetTimeAvailability";

interface TutorTimeAvailabilityProps {
	setPage: (page: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => void;
}

const TutorTimeAvailabilityPage: React.FC<TutorTimeAvailabilityProps> = ({ setPage }) => {
	const theme = useTheme<Theme>();
	const formMethods = useFormContext<AccountRegisterType>();
	const { control } = formMethods;

	useWatch({ control });

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
						gap: 10,
						width: "65%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<SetSubject />

					<SetTimeAvailability />

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
							onClick={() => setPage("primaryRegister")}
							sx={{ margin: 1, backgroundColor: theme.customColors.headingTextColor }}
							variant="contained"
						>
							Go back
						</Button>
						<Button
							onClick={() => setPage("tutorApplication")}
							type="submit"
							sx={{ margin: 1 }}
							variant="contained"
						>
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

export default TutorTimeAvailabilityPage;
