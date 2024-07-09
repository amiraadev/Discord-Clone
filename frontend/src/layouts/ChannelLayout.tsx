/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import ServerSidebar from "../components/navigation/ServerSidebar";

const ChannelLayout = () => {
	return (
		<>
		ChannelLayout:
			<ServerSidebar/>
			<Outlet />
		</>
	);
};

export default ChannelLayout;
