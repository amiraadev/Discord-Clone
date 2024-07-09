/** @format */

import React, { useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Button, Flex, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useServer } from "../../../hooks/graphql/server/useServer";
import { useClipboard } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import {
	UpdateServerWithNewInviteCodeMutation,
	UpdateServerWithNewInviteCodeMutationVariables,
} from "../../../gql/graphql";
import { UPDATE_SERVER_WITH_NEW_INVITE_CODE } from "../../../graphql/mutations/server/UpdateServerWithNewInviteCode";
import { useForm } from "@mantine/form";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const InviteModal = () => {
	const { isOpen, closeModal } = useModal("InvitePeople");
	const { server } = useServer();

	const clipboard = useClipboard({
		timeout: 1500,
	});

	const [updateServerWithNewInviteCode, { loading }] = useMutation<
		UpdateServerWithNewInviteCodeMutation,
		UpdateServerWithNewInviteCodeMutationVariables
	>(UPDATE_SERVER_WITH_NEW_INVITE_CODE, {
		variables: {
			serverId: server?.id,
		},
	});

	const form = useForm({
		initialValues: {
			inviteCode: "",
		},
	});

	useEffect(() => {
		if (!server?.inviteCode) return;
		form.setValues({
			inviteCode: server?.inviteCode,
		});
	}, [server?.inviteCode]);

	return (
		<Modal opened={isOpen} onClose={closeModal} title='Invite People'>
			<Stack>
				<Flex>
					<TextInput
						{...form.getInputProps("inviteCode")}
						rightSection={
							<button
                              style={{ cursor: 'pointer'}}
								// variant='transparent'
								onClick={() => clipboard.copy('your text to copy')}>
								{!clipboard.copied ? <IconCopy /> : <IconCheck color='green' />}
							</button>
						}
						label='Server Invite Code'
						w='100%'
						// ref={ref}
					/>
				</Flex>
				<Button
					disabled={loading}
					onClick={() => updateServerWithNewInviteCode()}>
					<Text mr='md'>Generate New Invite Code</Text>
				</Button>
			</Stack>
		</Modal>
	);
};

export default InviteModal;
