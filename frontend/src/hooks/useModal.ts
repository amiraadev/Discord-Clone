/** @format */

import { Modal, useGeneralStore } from "../stores/generalStore";

function useModal(ModalType: Modal) {
	const { activeModal, setActiveModal } = useGeneralStore();

	const isOpen = activeModal === ModalType;

	const openModal = () => {
		setActiveModal(activeModal);
	};
	const closeModal = () => {
		setActiveModal(null);
	};

	return {
		isOpen,
		openModal,
		closeModal,
	};
}
