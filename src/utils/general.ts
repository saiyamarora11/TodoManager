export const handleClick = () => {
	const button = document.activeElement;
	(button as HTMLElement)?.blur();
};
