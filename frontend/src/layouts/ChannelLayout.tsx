/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import ServerSidebar from "../components/navigation/ServerSidebar";

const ChannelLayout = () => {
	return (
		<>
			<ServerSidebar/>
			<Outlet />
		</>
	);
};

export default ChannelLayout;
