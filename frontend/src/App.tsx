import "./App.css";
import { ThemeProvider } from "@mui/material";
import { useCurrentTheme } from "./utilities/helperFunctions";
import ProtectedRoutes from "./api/authentication/ProtectedRoutes";
import AuthenticatedApp from "./AuthenticatedApp";
import { Route, Routes } from "react-router-dom";
import Register from "./components/login_and_register_components/Register";
import Login from "./components/login_and_register_components/Login";
import HomePage from "./components/page_components/HomePage";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "./state/stateStore";
import UnauthenticatedApp from "./UnauthenticatedApp";
import TuteeProtectedRoutes from "./api/authentication/TuteeProtectedRoutes";
import TutorProtectedRoutes from "./api/authentication/TutorProtectedRoutes";
import TutorPage from "./components/page_components/tutor/TutorPage";
import PostsListPage from "./components/page_components/tutor/PostsListPage";
import TutorApplicationPage from "./components/page_components/TutorApplicationPage";

export default function App() {
	const theme = useCurrentTheme(); // must use hook to make sure the theme is updated, stateful
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				{/* Public routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<HomePage />} />
					<Route element={<TuteeProtectedRoutes />}></Route>

					<Route element={<TutorProtectedRoutes />}>
						<Route path="/tutor" element={<TutorPage />} />
						<Route path="/tutor/posts-list" element={<PostsListPage />} />
						<Route path="/tutor/tutor-application" element={<TutorApplicationPage />} />
					</Route>
				</Route>
			</Routes>
		</ThemeProvider>
	);
}
