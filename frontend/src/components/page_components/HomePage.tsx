import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/api/authentication/useAuth";
import { Role } from "~/types/data_types";

export default function HomePage() {
  const { userState } = useAuth();

  const isTutee = userState.role?.includes(Role.Enum.Tutee);
  const isTutor = userState.role?.includes(Role.Enum.Tutor);

  if (!(isTutee && isTutor)) {
    if (isTutee) {
      return <Navigate to="/tutee" />;
    } else {
      return <Navigate to="/tutor" />;
    }
  }

  return (
    <MediumShortOnShortBoxLayout>
      <div>Put calendsar / Meeting overview here</div>
      <div>Put tutee notifications here</div>
      <div>Put tutor notifications here</div>
    </MediumShortOnShortBoxLayout>
  );
}
