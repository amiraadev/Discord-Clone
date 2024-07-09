/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import MobileSidebar from "../components/navigation/MobileSidebar";

const ChannelLayout = () => {
	return (
		<>
			<div style={{ paddingLeft: "100px", backgroundColor: "red" }}>
				<p>ChannelLayout</p>
			</div>
			<MobileSidebar />
			<Outlet />
		</>
	);
};

export default ChannelLayout;
