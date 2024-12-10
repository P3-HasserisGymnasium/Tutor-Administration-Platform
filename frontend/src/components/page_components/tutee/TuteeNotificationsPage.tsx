import EvenBoxLayout from "components/layout_components/EvenBoxLayout";
import AcceptInvitationDialog from "../dialogs/AcceptInvitationDialog";
import { useState } from "react";
import { CollaborationState } from "~/types/data_types";
export default function TuteeNotificationsPage() {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(true);

  const mockCollaboration = {
    id: 123456, // Replace with a number
    tutee_id: 78910, // Replace with a number
    tutor_id: 111213, // Replace with a number
    tutee_name: "Jane Doe",
    tutor_name: "John Smith",
    state: CollaborationState.PENDING, // Must be a valid value from CollaborationState
    subject: "MATH", // Must be a valid value from Subject
    end_date: null,
    start_date: null,
  };

  return (
    <EvenBoxLayout>
      <div>All notifcations here. Use a component that the other notification page also can use</div>

      <AcceptInvitationDialog open={isAcceptDialogOpen} setOpen={setIsAcceptDialogOpen} collaboration={mockCollaboration} />
    </EvenBoxLayout>
  );
}
