import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsDB from "./services/personsDB";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		personsDB.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		const nameExists = persons.some((person) => person.name === newName);
		if (nameExists)
			return alert(`${newName} is already added to the phonebook`);

		const personObject = {
			name: newName,
			number: newNumber,
		};

		personsDB.create(personObject).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName("");
			setNewNumber("");
		});
	};

	const handlePersonChange = (event) => setNewName(event.target.value);
	const handleNumberChange = (event) => setNewNumber(event.target.value);
	const handleSearchChange = (event) => setSearch(event.target.value);

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(search.toLowerCase())
	);

	const removePerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			personsDB.remove(person.id).then(() => {
				setPersons(persons.filter((p) => p.id !== person.id));
			});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter value={search} onChange={handleSearchChange} />

			<h3>Add a new</h3>

			<PersonForm
				onSubmit={addPerson}
				name={newName}
				onNameChange={handlePersonChange}
				number={newNumber}
				onNumberChange={handleNumberChange}
			/>

			<h3>Numbers</h3>

			<Persons persons={filteredPersons} removePerson={removePerson} />
		</div>
	);
};

export default App;
