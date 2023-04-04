const Notification = ({ result, message }) => {
	if (result === null) return;

	const allClassNames = `notification ${result}`;

	return <div className={allClassNames}>{message}</div>;
};

export default Notification;
