import LongShortBoxLayout from "components/layout_components/LongShortBoxLayout";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { useState } from "react";

export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);
  return (
    <LongShortBoxLayout>
      <DeleteAccountDialog open={isDeleteAcountDialogOpen} setOpen={setIsDeleteAcountDialogOpen} />

      <div>Preview and edit</div>
      <div>History</div>
    </LongShortBoxLayout>
  );
}
