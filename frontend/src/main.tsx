/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}


// const router = createBrowserRouter([
// 	{
// 		path: "/login",
// 		element: <Home />,
// 		children: [
// 			{
// 				path: "/chatrooms/:id",
// 			},
// 		],
// 	},
//   {
//     path: "/",
// 		element: <Home />,
// 		children: [
// 			{
// 				path: "/chatrooms/:id",
// 			},
// 		],
//   }
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<MantineProvider>
				<App />
			</MantineProvider>
		</ClerkProvider>
	</React.StrictMode>
);
