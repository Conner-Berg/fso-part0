import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const addPerson = (event) => {
		event.preventDefault();

		const nameExists = persons.some((person) => person.name === newName);
		if (nameExists)
			return alert(`${newName} is already added to the phonebook`);

		const personObject = {
			name: newName,
			number: newNumber,
		};
		setPersons(persons.concat(personObject));
		setNewName("");
		setNewNumber("");
	};

	const handlePersonChange = (event) => setNewName(event.target.value);
	const handleNumberChange = (event) => setNewNumber(event.target.value);
	const handleSearchChange = (event) => setSearch(event.target.value);

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			filter shown with{" "}
			<input onChange={handleSearchChange} value={search} />
			<h2>Add a new</h2>
			<form onSubmit={addPerson}>
				<div>
					name:{" "}
					<input onChange={handlePersonChange} value={newName} />
				</div>
				<div>
					number:{" "}
					<input onChange={handleNumberChange} value={newNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{filteredPersons.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
