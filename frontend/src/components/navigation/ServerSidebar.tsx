/** @format */

import React, { useEffect } from "react";
import ServerHeader from "./ServerHeader";
import classes from "./ServerSidebar.module.css";
import { useNavigate, useParams } from "react-router-dom";
const ServerSidebar = () => {
	const navigate = useNavigate();
	const { serverId, memberId,channelId } = useParams();
	useEffect(() => {
		if (!channelId && !memberId && textChannels.length) {
			navigate(`/servers/${serverId}/channels/${textChannels[0]?.id}`);
		}
	});

	return (
		<nav className={classes.nav}>
			<ServerHeader />
		</nav>
	);
};

export default ServerSidebar;
