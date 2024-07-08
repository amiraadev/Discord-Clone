/** @format */

import { UserButton } from "@clerk/clerk-react";
import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import {
	Button,
	Center,
	Stack,
	Tooltip,
	UnstyledButton,
	rem,
	useMantineColorScheme,
	useMantineContext,
} from "@mantine/core";
import {
	IconArrowsJoin,
	IconMoon,
	IconPlus,
	IconSun,
} from "@tabler/icons-react";

import { useModal } from "../../hooks/useModal";
import { useGeneralStore } from "../../stores/generalStore";
import { useServers } from "../../hooks/graphql/server/useServers";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetServersQuery, GetServersQueryVariables } from "../../gql/graphql";
import { GET_SERVERS } from "../../graphql/queries/GetServers";

interface NavbarLinkProps {
	label: string;
	active?: boolean;
	imageUrl?: string;
	onClick: () => void;
}
function NavbarLink({ imageUrl, label, active, onClick }: NavbarLinkProps) {
	return (
		<Tooltip label={label} position='right'>
			<UnstyledButton
				onClick={onClick}
				data-active={active || undefined}
				variant='transparent'
				style={{ borderRadius: "10px" }}>
				<img
					src={imageUrl}
					width={"50px"}
					height={"50px"}
					style={{ borderRadius: "50%" }}
				/>
			</UnstyledButton>
		</Tooltip>
	);
}
const Sidebar = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const createServerModal = useModal("CreateServer");

	const { servers, loading } = useServers();
	const [active, setActive] = useState(0);
	const navigate = useNavigate();


	

	const links = servers?.map((server, index) => (
		<NavbarLink
			label={server?.name}
			imageUrl={server.imageUrl}
			key={server.id}
			onClick={() => {
				setActive(index);
				navigate(`/servers/${server.id}`);
			}}
		/>
	));

	const { data, isLoading, error, refetch } = useQuery<
		GetServersQuery,
		GetServersQueryVariables
	>(GET_SERVERS);

	const test = () => {
		createServerModal.openModal();
		const servers = data?.getServers;
		console.log("Servers:", servers);
	};

	return (
		<nav className={classes.navbar}>
			<Stack>
				<Center>
					<Button
						className={classes.link}
						variant='subtle'
						radius={100}
						onClick={() => {
							createServerModal.openModal();
							// test()
						}}>
						<IconPlus radius={100} />
					</Button>
				</Center>
				<Center>
					<Button
						className={classes.link}
						variant='subtle'
						radius={100}
						onClick={() => {}}>
						<IconArrowsJoin radius={100} />
					</Button>
				</Center>
				<Stack justify='center' gap='md' mt='xl'>
					{links}
				</Stack>
			</Stack>
			<Stack justify='center' align='center'>
				<Button
					className={classes.link}
					variant='subtle'
					onClick={toggleColorScheme}
					radius={100}
					p={0}>
					{colorScheme === "dark" ? (
						<IconMoon radius={100} />
					) : (
						<IconSun radius={100} />
					)}
				</Button>
			</Stack>
			<UserButton />
		</nav>
	);
};

export default Sidebar;
