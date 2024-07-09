/** @format */

import React, { useEffect } from "react";
import ServerHeader from "./ServerHeader";
import classes from "./ServerSidebar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useServer } from "../../hooks/graphql/server/useServer";
const ServerSidebar = () => {
	const navigate = useNavigate();
	const { serverId, memberId, channelId } = useParams();

	const { textChannels, audioChannels, videoChannels, server, role, members } =
		useServer();
	useEffect(() => {
		if (!channelId && !memberId && textChannels.length) {
			navigate(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`);
		}
	});

	return (
		<nav className={classes.nav}>
			<ServerHeader />
		</nav>
	);
};

export default ServerSidebar;
