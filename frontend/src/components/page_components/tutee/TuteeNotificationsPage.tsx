import EvenBoxLayout from "components/layout_components/EvenBoxLayout";
import AcceptInvitationDialog from "../dialogs/AcceptInvitationFromTutorDialog";
import { useState } from "react";
import { z } from "zod";
import { CollaborationState, Day, YearGroup, Language, ComunicationMedium} from "~/types/data_types";
import { zodCollaborationSchema, tutorProfileSchema } from "~/types/entity_types";
import { Subject } from "~/types/data_types";

export default function TuteeNotificationsPage() {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(true);

  type Collaboration = z.infer<typeof zodCollaborationSchema>;
  type TutorProfile = z.infer<typeof tutorProfileSchema>; 
 

  const mockCollaboration: Collaboration = {
    id: 123456, // Replace with a number
    tutee_id: 78910, // Replace with a number
    tutor_id: 111213, // Replace with a number
    tutee_name: "John Smith",
    tutor_name: "Jan Doe",
    state: CollaborationState.Enum.PENDING, // Must be a valid value from CollaborationState
    subject: Subject.Enum.DANISH, // Must be a valid value from Subject
    end_date: undefined,
    start_date: undefined,
  };

  const mockTutorProfile : TutorProfile = {
    contact_info: [
      {
        username: "janedoe123",
        ComunicationMedium: ComunicationMedium.Enum.Email,
      }
    ],
    description: "I am an experienced tutor passionate about helping students excel in their studies. I specialize in mathematics and physics.",
    full_name: "Jane Doe",
    time_availability: [
      {
        day: Day.Enum.Monday,
        time : [{
          start_time: "10:00", 
          end_time: "12:00" 
        },
      ],
      },
    ],
    tutoring_subjects: [Subject.Enum.CHEMISTRY, Subject.Enum.DANISH],
    yearGroup: YearGroup.Enum.IB_1,
    languages: [Language.Enum.Danish, Language.Enum.English],
  };


  return (
    <EvenBoxLayout>
      <div>All notifcations here. Use a component that the other notification page also can use</div>

      <AcceptInvitationDialog open={isAcceptDialogOpen} setOpen={setIsAcceptDialogOpen} collaboration={mockCollaboration} tutorProfile={mockTutorProfile}/>
    </EvenBoxLayout>
  );
}
