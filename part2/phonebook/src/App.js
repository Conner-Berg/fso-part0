import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addPerson = (event) => {
		event.preventDefault();

		const nameExists = persons.some((person) => person.name === newName);
		if (nameExists)
			return alert(`${newName} is already added to the phonebook`);

		const personObject = {
			name: newName,
		};
		setPersons(persons.concat(personObject));
		setNewName("");
	};

	const handlePersonChange = (event) => {
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name:{" "}
					<input onChange={handlePersonChange} value={newName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((person) => (
					<p key={person.name}>{person.name}</p>
				))}
			</div>
		</div>
	);
};

export default App;
