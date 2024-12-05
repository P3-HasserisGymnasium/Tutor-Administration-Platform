import { ThemeProvider } from "@mui/material";
import EvenBoxLayout from "~/components/layout_components/EvenBoxLayout";
import PostCreation from "~/components/content_components/PostCreationComponents/PostCreation";
import PostCreationInfo from "~/components/content_components/PostCreationComponents/PostCreationInfo";
import tuteeTheme from "~/themes/tuteeTheme";

export default function CreatePostPage() {
	return (
		<ThemeProvider theme={tuteeTheme}>
			<EvenBoxLayout>
				<PostCreation />
				<PostCreationInfo />
			</EvenBoxLayout>
		</ThemeProvider>
	);
}