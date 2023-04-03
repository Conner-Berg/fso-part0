const Persons = ({ persons, removePerson }) => {
	return (
		<div>
			{persons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}{" "}
					<button onClick={() => removePerson(person)}>delete</button>
				</p>
			))}
		</div>
	);
};

export default Persons;
