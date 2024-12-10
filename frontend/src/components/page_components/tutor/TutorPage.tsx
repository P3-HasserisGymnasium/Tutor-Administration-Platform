import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { useAuth } from "~/api/authentication/useAuth";

export default function TutorPage() {
  const { userState } = useAuth();
  console.log("user:", userState);
  return (
    <MediumShortOnShortBoxLayout>
      <div>Put calendar / Meeting overview here</div>
      <div>Put list of posts here</div>
      <div>Put active collaborations here</div>
    </MediumShortOnShortBoxLayout>
  );
}
