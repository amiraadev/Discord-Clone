/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Modal =
	| "CreateServer"
	| "InvitePeople"
	| "UpdateServer"
	| "CreateChannel"
	| "ManageMembers"
	| "DeleteChannel"
	| "UpdateChannel"
	| "DeleteServer"
	| "ServerJoin"
	| "UpdateMessage"
	| "LeaveServer";

interface GeneralStore {
	activeModal: Modal | null;
	drawerOpen: boolean;
	setActiveModal: (modal: Modal | null) => void;
	toggleDrawer: () => void;
}

export const useGeneralStore = create<GeneralStore>()(
	persist(
		(set) => ({
			activeModal: null,
			drawerOpen: true,
			setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
			toggleDrawer:() => set((state) => ({drawerOpen : !state.drawerOpen}))
		}),
		{
			name: "generalStore",
		}
	)
);
