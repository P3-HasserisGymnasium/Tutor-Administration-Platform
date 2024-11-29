import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import baseTheme from "./themes/baseTheme.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/api-client.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient} >
				<ThemeProvider theme={baseTheme}>
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
