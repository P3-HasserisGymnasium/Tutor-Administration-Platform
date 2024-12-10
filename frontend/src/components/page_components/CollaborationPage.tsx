import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import RequestMeetingDialog from "./dialogs/RequestMeetingDialog";
import { Day, TimeAvailabilitiesType } from "~/types/data_types";
import { useState } from "react";
import EndCollaborationDialog from "./dialogs/EndCollaborationDialog";


const mockTimeAvailabilities: TimeAvailabilitiesType[] = [
	{
		day: Day.Enum.Monday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
	{
		day: Day.Enum.Tuesday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
	{
		day: Day.Enum.Wednesday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
	{
		day: Day.Enum.Thursday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
];

export default function CollaborationPage() {
	const [isRequestMeetingDialogOpen, setIsRequestMeetingDialogOpen] = useState(false);
	const [isEndCollaborationDialogOpen, setIsEndCollaborationDialogOpen] = useState(true);

	return (
		<MediumShortOnShortBoxLayout>
			<RequestMeetingDialog
				open={isRequestMeetingDialogOpen}
				setOpen={setIsRequestMeetingDialogOpen}
				timeAvailabilities={mockTimeAvailabilities}
			/>
			<EndCollaborationDialog
				open={isEndCollaborationDialogOpen}
				setOpen={setIsEndCollaborationDialogOpen}
			/>

	

			<div>Put scedule here</div>
			<div>Put tutor communication here</div>
			<div>Put meetings here</div>
		</MediumShortOnShortBoxLayout>
	);
}
