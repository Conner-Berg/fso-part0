const PersonForm = ({
	onSubmit,
	name,
	onNameChange,
	number,
	onNumberChange,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input onChange={onNameChange} value={name} />
			</div>
			<div>
				number: <input onChange={onNumberChange} value={number} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
