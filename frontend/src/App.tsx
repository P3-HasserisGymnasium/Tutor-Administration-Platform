import "./index.css";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import { useCurrentTheme } from "./utilities/helperFunctions";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/login_and_register_components/Register";
import Login from "./components/login_and_register_components/Login";

import { Suspense, lazy } from "react";
import Loading from "./api/authentication/Loading";
import unauthenticatedAppTheme from "~/themes/unauthenticatedAppTheme";
import { useAuth } from "./api/authentication/useAuth";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

export default function App() {
	const theme = useCurrentTheme(); // must use hook to make sure the theme is updated, stateful
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return (
			<ThemeProvider theme={unauthenticatedAppTheme}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</ThemeProvider>
		);
	}
	return (
		<ThemeProvider theme={theme}>
			<Suspense fallback={<Loading size={150} />}>
				<AuthenticatedApp />
			</Suspense>
		</ThemeProvider>
	);
}
