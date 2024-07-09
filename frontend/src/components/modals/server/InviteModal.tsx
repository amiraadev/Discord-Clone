/** @format */

import React from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "@mantine/core";

const InviteModal = () => {
	const { isOpen, closeModal } = useModal("InvitePeople");
	return (
		<Modal opened={isOpen} onClose={closeModal} title='Invite People'>
			Invite People
		</Modal>
	);
};

export default InviteModal;
