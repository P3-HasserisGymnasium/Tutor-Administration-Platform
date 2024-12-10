import { Box, Stack, Typography } from "@mui/material";
/* import PostCard from "./PostCard";
 */
export default function PostList() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        margin: "1em",
      }}
    >
      <Typography variant="h2">Filtered Posts</Typography>

      <Stack
        spacing={1}
        sx={{
          overflowY: "auto",
          marginTop: "0.5em",
        }}
      >
        {/*         <PostCard key={1} post={postDemo} />
         */}{" "}
      </Stack>
    </Box>
  );
}
