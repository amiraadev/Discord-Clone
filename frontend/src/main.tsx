/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
	ClerkProvider,
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@clerk/clerk-react";
import {
  BrowserRouter,
	Navigate,
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
	useNavigate,
} from "react-router-dom";

import {} from "@clerk/clerk-react";
import RouteLayout from "./layouts/RouteLayout.tsx";
import HomePages from "./pages/HomePages.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};

const RouterComponent = () => {
	const navigate = useNavigate();

	return (
		<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
			<Routes>
				<Route path='' element={<RouteLayout />}>
					<Route
						element={
							<ProtectedRoute>
								<HomePages />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</ClerkProvider>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
			<MantineProvider>
      <BrowserRouter>
				<RouterComponent />
      </BrowserRouter>
			</MantineProvider>
	</React.StrictMode>
);

export default RouterComponent;