import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Loading from "~/api/authentication/Loading";
import MiniPost from "~/components/content_components/MiniPost";
import { PostType } from "~/types/entity_types";

type ViewPostsDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  posts: PostType[] | undefined;
  isLoading: boolean;
};

export default function RequestMeetingDialog({ open, setOpen, posts, isLoading }: ViewPostsDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 1,
          paddingBottom: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      {isLoading ? (
        <Loading size={100} />
      ) : (
        <>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", pb: 0 }}>Your active posts</DialogTitle>
          <DialogContentText textAlign={"center"} pt={0}>
            Click on a post to edit it
          </DialogContentText>
          <DialogContent sx={{ display: "flex", flexWrap: "wrap", gap: 2, pr: 0, justifyContent: "center" }}>
            {posts?.map((post) => (
              <MiniPost key={post.id} postData={post} />
            ))}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
