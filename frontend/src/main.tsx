/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
	ClerkProvider,
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {} from "@clerk/clerk-react";
import RouteLayout from "./layouts/RouteLayout.tsx";
import HomePages from "./pages/HomePages.tsx";
import CreateServerModal from "./components/modals/CreateServerModal.tsx";

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
	return (
		<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
			<Routes>
				<Route path='' element={<RouteLayout />}>
					<Route
						index
						element={
							<ProtectedRoute>
								<CreateServerModal />
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
