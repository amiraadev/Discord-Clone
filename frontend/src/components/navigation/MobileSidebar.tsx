/** @format */

import { useGeneralStore } from "../../stores/generalStore";
import Sidebar from "./Sidebar";
import { Drawer, rem } from "@mantine/core";
import ServerSidebar from "./ServerSidebar";

const MobileSidebar = () => {
	const { drawerOpen, toggleDrawer } = useGeneralStore((state) => state);
	console.log("mobile sidebar");
	return (
		<>
			<Sidebar />
			<Drawer
				padding='0'
				mb='0'
				zIndex={10}
				onClose={toggleDrawer}
				size={rem(320)}
				position={"left"}
				ml={rem(80)}
				withOverlay={true}
				styles={{ root: { width: 0, height: 0, position: "fixed" } }}
				opened={true}
				// opened={drawerOpen}
				withCloseButton={true}
				title='Authentication'>
				
				<ServerSidebar />
			</Drawer>
		</>
	);
};

export default MobileSidebar;
