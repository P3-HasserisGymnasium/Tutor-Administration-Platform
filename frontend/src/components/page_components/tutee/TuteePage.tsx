import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import EditPostDialog from "../dialogs/EditPostDialog";
import { useState } from "react";
import { PostType } from "~/types/entity_types";
import { PostState, Subject } from "~/types/data_types";

const post: PostType = {
  id: 1,
  title: "hjælp mig",
  description: "iosjdsiaojdaojdasdiasdjsaod jsadj iasojdasd",
  subject: Subject.Enum.Danish,
  duration: [2, 8],
  state: PostState.Enum.VISIBLE,
};

export default function TuteePage() {
  const [open, setOpen] = useState(true);
  return (
    <MediumShortOnShortBoxLayout>
      <EditPostDialog open={open} setOpen={setOpen} post={post} />
      <div>Put calendar / Meeting overview here</div>
      <div>Put your active posts here</div>
      <div>Put active collaborations here</div>
    </MediumShortOnShortBoxLayout>
  );
}
