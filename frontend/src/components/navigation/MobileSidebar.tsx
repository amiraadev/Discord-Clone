import { useGeneralStore } from '../../stores/generalStore'
import Sidebar from './Sidebar'
import { Drawer, rem } from "@mantine/core"
import ServerSidebar from './ServerSidebar'

const MobileSidebar = () => {
    const { drawerOpen, toggleDrawer } = useGeneralStore((state) => state)
    console.log("mobile sidebar")
      return (
    <>
    <Sidebar/>
    <Drawer
       padding="0"
       mb="0"
       zIndex={10}
       onClose={toggleDrawer}
       opened={drawerOpen}
       size={rem(320)}
       position={"left"}
       withOverlay={false}
       styles={{ root: { width: 0, height: 0, position: "fixed" } }}
       withCloseButton={false}
       ml={rem(80)}
    >
         <ServerSidebar />
         </Drawer>
    </>
  )
}

export default MobileSidebar