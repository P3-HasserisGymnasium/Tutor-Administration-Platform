import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import ViewCollaborationsDialog from "../dialogs/ViewCollaborationsDialog";
import { CollaborationType } from "~/types/entity_types";
import { CollaborationState, Subject } from "~/types/data_types";

const mockCollaborations: CollaborationType[] = [
	{
		id: 29167,
		end_date: new Date(),
		tutee_id: 1,
		tutee_name: "Tutee",
		start_date: new Date(),
		tutor_id: 2,
		tutor_name: "Tutor",
		state: CollaborationState.Enum.ACCEPTED,
		subject: Subject.Enum.Math,
	},
	{
		id: 29167,

		end_date: new Date(),
		tutee_id: 3,
		tutee_name: "Tutee",
		start_date: new Date(),
		tutor_id: 4,
		tutor_name: "Tutor",
		state: CollaborationState.Enum.ACCEPTED,
		subject: Subject.Enum.Chemistry,
	},
	{
		id: 29167,

		end_date: new Date(),
		tutee_id: 5,
		tutee_name: "Tutee",
		start_date: new Date(),
		tutor_id: 6,
		tutor_name: "Tutor",
		state: CollaborationState.Enum.ACCEPTED,
		subject: Subject.Enum.Physics,
	},
];

export default function TuteePage() {
	return (
		<MediumShortOnShortBoxLayout>
			<ViewCollaborationsDialog open={false} setOpen={() => { }} collaborations={mockCollaborations} />{" "}
			{/*Replace with actual collaborations that have been fetched */}
			<div>Put calendar / Meeting overview here</div>
			<div>Put your active posts here</div>
			<div>Put active collaborations here</div>
		</MediumShortOnShortBoxLayout>
	);
}
