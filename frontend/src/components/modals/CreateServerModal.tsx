/** @format */

import React, { useEffect } from "react";
import {
	Button,
	Flex,
	Group,
	Image,
	Modal,
	Stack,
	Text,
	TextInput,
	rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE, DropzoneProps } from "@mantine/Dropzone";
import { useModal } from "../../hooks/useModal";
import classes from "./CreateServerModal.module.css";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useMutation, useQuery } from "@apollo/client";
import {
	CreateServerMutation,
	CreateServerMutationVariables,
	GetServersQuery,
	GetServersQueryVariables,
} from "../../gql/graphql";
import { CREATE_SERVER } from "../../graphql/mutations/server/CreateServer";
import { useProfileStore } from "../../stores/profileStore";
import { GET_SERVERS } from "../../graphql/queries/GetServers";

const CreateServerModal = () => {
	const { isOpen, closeModal } = useModal("CreateServer");
	const profileId = useProfileStore((state) => state.profile?.id);

	const [createServer, { loading, error }] = useMutation<
		CreateServerMutation,
		CreateServerMutationVariables
	>(CREATE_SERVER);
	const { refetch } = useQuery<GetServersQuery, GetServersQueryVariables>(
		GET_SERVERS
	);
	const form = useForm({
		initialValues: {
			name: "",
		},
		validate: {
			name: (value) => !value.trim() && "Please enter a name",
		},
	});
	const onSubmit = () => {
		if (!form.validate()) return;
		console.log({ name: form.values.name, profileId });

		createServer({
			variables: {
				input: {
					name: form.values.name,
					profileId,
				},
				file,
			},
			onCompleted: () => {
				setImagePreview(null);
				setFile(null);
				form.reset();
				refetch();
				// Optionally handle the refetch result
				refetch().then((newData) => {
					console.log("Servers (after refetch):", newData.data.getServers);
				});
				closeModal();
			},
			refreshQueries: ["GetServers"],
		});
	};
	const [imagePreview, setImagePreview] = React.useState<string | null>(null);

	const [file, setFile] = React.useState<File | null>(null);
	const handleDropzoneChange: DropzoneProps["onDrop"] = (files) => {
		if (files.length === 0) {
			return setImagePreview(null);
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			setImagePreview(e.target?.result as string);
		};
		setFile(files[0]);
		reader.readAsDataURL(files[0]);
	};
	return (
		<Modal opened={isOpen} onClose={closeModal} title='Create a server'>
			<Text c='dimmed'>
				Give your server a personality with a name and an image. You can always
				change it later.
			</Text>

			<form
				onSubmit={form.onSubmit(() => {
					onSubmit();
				})}>
				<Stack>
					<Flex justify='center' align='center' direction={"column"}>
						{!imagePreview && (
							<Dropzone
								className={classes.dropZone}
								mt='md'
								onDrop={(files) => {
									handleDropzoneChange(files);
								}}
								accept={IMAGE_MIME_TYPE}>
								<Group style={{ minHeight: rem(100), pointerEvents: "none" }}>
									<Dropzone.Accept>
										<IconUpload size='3.2rem' stroke={1.5} />
									</Dropzone.Accept>
									<Dropzone.Reject>
										<IconX size='3.2rem' stroke={1.5} />
									</Dropzone.Reject>
									<Dropzone.Idle>
										<IconUpload size='3.2rem' stroke={1.5} />
									</Dropzone.Idle>
									<Stack>
										<Text size='xl' inline>
											Drag images here or click to select files
										</Text>
										<Text size='sm' c='dimmed' inline mt={7}>
											Upload a server icon
										</Text>
										{error?.message && !file && (
											<Text c='red'>{error?.message}</Text>
										)}
									</Stack>
								</Group>
							</Dropzone>
						)}

						{imagePreview && (
							<Flex pos='relative' w={rem(150)} h={rem(150)} mt='md'>
								<>
									<Button
										onClick={() => {
											setImagePreview(null);
											setFile(null);
										}}
										color='red'
										pos='absolute'
										style={{
											zIndex: 1,
											borderRadius: "50%",
											padding: 0,
											width: rem(30),
											height: rem(30),
											top: 0,
											right: 18,
										}}>
										<IconX color='white' />
									</Button>
									{/* <Image
										// src={imagePreview}
										src={"./noor2.jpg"}
										width={rem(150)}
										height={rem(150)}
										radius={"50%"}
									/> */}
									<img
										src={imagePreview}
										alt='Image description' // Add an alt attribute for accessibility
										width={"150rem"}
										height={"150rem"}
										style={{ borderRadius: "50%" }}
									/>
								</>
							</Flex>
						)}
					</Flex>
					<TextInput
						label='Server name'
						placeholder='Enter Server name'
						{...form.getInputProps("name")}
						error={form.errors.name}
					/>
					<Button
						w={"30%"}
						type='submit'
						variant='gradient'
						mt='md'
						disabled={!!form.errors.name || loading}>
						Create Server
					</Button>
				</Stack>
			</form>
		</Modal>
	);
};

export default CreateServerModal;
