import "./index.css";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import { useCurrentTheme } from "./utilities/helperFunctions";
import { Route, Routes } from "react-router-dom";
import Register from "./components/login_and_register_components/Register";
import Login from "./components/login_and_register_components/Login";

import { Suspense, lazy } from "react";
import Loading from "./api/authentication/Loading";
import unauthenticatedAppTheme from "~/themes/unauthenticatedAppTheme";
import { useAuth } from "./api/authentication/useAuth";
import NotFound from "./api/authentication/NotFound";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

export default function App() {
  const theme = useCurrentTheme(); // must use hook to make sure the theme is updated, stateful
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={unauthenticatedAppTheme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <AuthenticatedApp />
      </Suspense>
    </ThemeProvider>
  );
}
