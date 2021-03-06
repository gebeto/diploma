import * as React from 'react';


export const useModal = () => {
	const [isModalOpened, setIsModalOpened] = React.useState(false);

	const handleModalOpen = React.useCallback(() => setIsModalOpened(true), [])
	const handleModalClose = React.useCallback(() => setIsModalOpened(false), [])

	return {
		isModalOpened: isModalOpened,
		handleModalOpen: handleModalOpen,
		handleModalClose: handleModalClose,
	}
}

export const useModalArray = () => {
	const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);

	const handleModalOpen = React.useCallback((e?: any) => {
		setIsModalOpened(true)
	}, []);
	
	const handleModalClose = React.useCallback((e?: any) => {
		setIsModalOpened(false)
	}, []);

	return [
		isModalOpened,
		handleModalOpen,
		handleModalClose,
	] as [
		typeof isModalOpened,
		typeof handleModalOpen,
		typeof handleModalClose,
	]
}
