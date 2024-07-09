/** @format */

import React, { useEffect } from "react";
import ServerHeader from "./ServerHeader";
import classes from "./ServerSidebar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useServer } from "../../hooks/graphql/server/useServer";
import { ScrollArea, Stack } from "@mantine/core";
import ServerSideBarSection from "./ServerSideBarSection";
import ServerChannel from "./ServerChannel";
import { ChannelType } from "../../gql/graphql";
const ServerSidebar = () => {
	const navigate = useNavigate();
	const { serverId, memberId, channelId } = useParams();

	const { textChannels, audioChannels, videoChannels, server, role, members } =
		useServer();

	console.log({ server });
	console.log({ role });

	useEffect(() => {
		if (!channelId && !memberId && textChannels.length) {
			navigate(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`);
		}
	});

	const [activeMemberId, setActiveMemberId] = React.useState<number | null>();
	const [activeChannelId, setActiveChannelId] = React.useState<number | null>();

	useEffect(() => {
		if (memberId) {
			setActiveMemberId(parseInt(memberId));
			setActiveChannelId(null);
		}
		if (channelId) {
			setActiveChannelId(parseInt(memberId));
			setActiveMemberId(null);
		}
	}, []);

	if (!server || !role) return null;
	return (
		// <nav >
		<nav className={classes.nav}>
			<ServerHeader server={server} memberRole={role} />
			{/* ServerSearch */}
			<ScrollArea>
				{!!textChannels.length && (
					<ServerSideBarSection
						sectionType='channels'
						channelType={ChannelType.Text}
						role={role}
						label='Text Channels'
					/>
				)}
				<Stack>
					{textChannels.map((channel) => (
						<ServerChannel
							key={channel.id}
							channel={channel}
							server={server}
							role={role}
							isActive={activeChannelId === channel.id}
						/>
					))}
				</Stack>
				{!!audioChannels.length && (
				
					<ServerSideBarSection
						sectionType='channels'
						channelType={ChannelType.Audio}
						role={role}
						label='Audio Channels'
					/>
				
				)}
				<Stack>
					{audioChannels.map((channel) => (
						<ServerChannel
							key={channel.id}
							channel={channel}
							server={server}
							role={role}
							isActive={activeChannelId === channel.id}
						/>
					))}
				</Stack>
				{!!videoChannels.length && (
				
					<ServerSideBarSection
						sectionType='channels'
						channelType={ChannelType.Video}
						role={role}
						label='Video Channels'
					/>
				
				)}
				<Stack>
					{videoChannels.map((channel) => (
						<ServerChannel
							key={channel.id}
							channel={channel}
							server={server}
							role={role}
							isActive={activeChannelId === channel.id}
						/>
					))}
				</Stack>
			</ScrollArea>
		</nav>
	);
};

export default ServerSidebar;
