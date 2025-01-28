import "./index.css";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import { useCurrentTheme } from "./utilities/helperFunctions";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/login_and_register_components/Register";
import Login from "./components/login_and_register_components/Login";

import { Suspense, lazy, useEffect } from "react";
import Loading from "./api/authentication/Loading";
import unauthenticatedAppTheme from "~/themes/unauthenticatedAppTheme";
import { useAuth } from "./api/authentication/useAuth";
import { useDemoService } from "./api/services/demo-service";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

export default function App() {
	const theme = useCurrentTheme(); // must use hook to make sure the theme is updated, stateful
	const { isAuthenticated } = useAuth();

	const { useDemoSetup, useDemoClean } = useDemoService();
	const demoSetupMutation = useDemoSetup();
	const demoCleanMutation = useDemoClean();

	type BooleanVoidMapping = [(event: KeyboardEvent) => boolean, () => void];

	const keyCommandMapping: BooleanVoidMapping[] = [
		[
			(event: KeyboardEvent) => event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s",
			demoSetupMutation.mutate
		],
		[
			(event: KeyboardEvent) => event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c",
			demoCleanMutation.mutate
		],
	];


	const handleKeyDown = (event: KeyboardEvent) => {

		keyCommandMapping.forEach(([keyCheck, command]) => {
			if (keyCheck(event)) {
				event.preventDefault();
				command();
			}
		});
	};

	useEffect(() => {
		// Add the event listener
		window.addEventListener("keydown", handleKeyDown);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []); // Empty dependency array ensures this runs once when the component mounts

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
