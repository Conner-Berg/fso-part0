const Notification = ({ result, message }) => {
	if (message === null) {
		return null;
	}

	return (
		<div className={result} notification>
			{message}
		</div>
	);
};

export default Notification;
