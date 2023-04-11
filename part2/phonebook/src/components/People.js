const People = ({ people, removePerson }) => {
	return (
		<div>
			{people.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}{" "}
					<button onClick={() => removePerson(person)}>delete</button>
				</p>
			))}
		</div>
	);
};

export default People;
