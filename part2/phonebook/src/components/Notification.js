const Notification = ({ result, message }) => {
	if (message === null) {
		return null;
	}

	return <div className={result}>{message}</div>;
};

export default Notification;
