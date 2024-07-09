/** @format */

import React from "react";
import { ChannelType, MemberRole } from "../../gql/graphql";
import { useModal } from "../../hooks/useModal";
import { useGeneralStore } from "../../stores/generalStore";
import { Flex, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface ServerSideBarSectionProps {
	sectionType: "channels" | "members";
	channelType: ChannelType;
	role: MemberRole;
	label: string;
}
const ServerSideBarSection = ({
	sectionType,
	channelType,
	role,
	label,
}: ServerSideBarSectionProps) => {
	const channelModal = useModal("CreateChannel");
	const manageMembersModal = useModal("ManageMembers");
	const setChannelTypeForCreateChannelModal = useGeneralStore(
		(state) => state.setChannelTypeForCreateChannelModal
	);

	const handleOnClick = () => {
		setChannelTypeForCreateChannelModal(channelType);
		channelModal.openModal();
	};

	if (role !== MemberRole.Guest && sectionType === "channels") {
		return (
			<Tooltip label='Create a new channel' withArrow onClick={handleOnClick}>
				<Flex p='md' style={{ cursor: "pointer" }}>
					<Flex justify={"space-between"} w='100%'>
						<Text fw={700}>{label}</Text>
					</Flex>
					<IconPlus />
				</Flex>
			</Tooltip>
		);
	}
	if (role !== MemberRole.Admin && sectionType === "members") {
		return (
			<Tooltip label='Manage members' withArrow onClick={manageMembersModal.openModal}>
				<Flex p='md' style={{ cursor: "pointer" }}>
					<Flex justify={"space-between"} w='100%'>
						<Text fw={700}>{label}</Text>
					</Flex>
					<IconPlus />
				</Flex>
			</Tooltip>
		);
	}
	return <div>ServerSideBarSection</div>;
};

export default ServerSideBarSection;
