import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCollaborationService } from "~/api/services/collaboration-service";
import CustomButton from "~/components/content_components/CustomButton";
import { TerminationType } from "~/types/entity_types";

type GeneralDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const EndCollaborationDialog = ({ open, setOpen }: GeneralDialogProps) => {
	const endColaborationMutation = useCollaborationService().useTerminateCollaboration();
	const location = useLocation();
	const collaborationId = location.pathname.split("/").filter(Boolean).pop();
	console.log(collaborationId);

	const [selectedRadio, setSelectedRadio] = useState<string>("");
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedRadio(event.target.value);
	};

	const [otherText, setOtherText] = useState<string>("");
	const handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOtherText(event.target.value);
		setSelectedRadio("Other");
	};

	const handleTermination = () => {
		if (collaborationId != undefined) {
			let reason: string;
			if (selectedRadio != "Other") {
				reason = selectedRadio;
			} else {
				reason = otherText;
			}
			console.log("radio: " + selectedRadio);
			const termination: TerminationType = {
				id: parseInt(collaborationId),
				terminationReason: reason,
			};

			endColaborationMutation.mutate(termination, {
				onSuccess: () => {
					setOpen(false);
					toast.success("Collaboration ended");
				},
				onError: (e: AxiosError) => {
					toast.error("Error in termination: " + e.code);
				},
			});
		}
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
			scroll="paper"
			PaperProps={{
				sx: {
					borderRadius: 4,
					padding: 1,
					paddingBottom: 1,
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
					justifyContent: "center",
					alignItems: "center",
				},
			}}
		>
			<DialogTitle>End collaboration</DialogTitle>
			<DialogContent
				sx={{
					display: "flex",
					flexDirection: "column",
					paddingBottom: 0,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography sx={{ paddingBottom: 1 }}>
					<strong> Why did the collaboration end? </strong> <i> - not required</i>
				</Typography>
				<RadioGroup
					sx={{ paddingBottom: 1 }}
					aria-labelledby="some-label-name"
					name="radio-buttons-group"
					value={selectedRadio}
					onChange={handleRadioChange}
				>
					<FormControlLabel
						value="Reached learning objectives"
						control={<Radio />}
						label="Reached learning objectives"
					/>
					<FormControlLabel
						value="Not satisfied with collaboration"
						control={<Radio />}
						label="Not satisfied with collaboration"
					/>
					<FormControlLabel value="Other" control={<Radio />} label="Other (please specify below)" />
				</RadioGroup>

				<TextField
					sx={{ paddingBottom: 1 }}
					id="other-text"
					label=""
					multiline
					rows={4}
					defaultValue=""
					onChange={handleOtherTextChange}
				/>
			</DialogContent>
			<DialogActions sx={{ paddingRight: 3 }}>
				<CustomButton onClick={() => setOpen(false)} customType="success">
					Cancel
				</CustomButton>
				<CustomButton onClick={handleTermination} customType="warning">
					End
				</CustomButton>
			</DialogActions>
		</Dialog>
	);
};

export default EndCollaborationDialog;
