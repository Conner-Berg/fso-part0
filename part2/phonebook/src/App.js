import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsDB from "./services/personsDB";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personsDB.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const addNewPerson = (personObject) => {
		personsDB.create(personObject).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName("");
			setNewNumber("");
			getSuccess(returnedPerson.name);
		});
	};

	const updateExistingPerson = (existingPerson, newNumber) => {
		const updatedPerson = { ...existingPerson, number: newNumber };
		personsDB
			.update(updatedPerson.id, updatedPerson)
			.then((returnedPerson) => {
				setPersons(
					persons.map((person) =>
						person.id !== returnedPerson.id
							? person
							: returnedPerson
					)
				);
				setNewName("");
				setNewNumber("");
				getSuccess(existingPerson.name);
			})
			.catch((error) => {
				getError(existingPerson.name);
				setPersons(
					persons.filter((person) => person.id !== existingPerson.id)
				);
			});
	};

	const getSuccess = (person) => {
		setResult("success");
		setMessage(`Added ${person}`);
		setTimeout(() => {
			setResult(null);
		}, 5000);
	};

	const getError = (person) => {
		setResult("error");
		setMessage(
			`Information of ${person} has already been removed from server`
		);
		setTimeout(() => {
			setResult(null);
		}, 5000);
	};

	const addPerson = (event) => {
		event.preventDefault();

		if (!newName || !newNumber) {
			alert("Please enter a name and number");
			return;
		}

		const existingPerson = persons.find(
			(person) => person.name === newName
		);

		if (existingPerson && existingPerson.number === newNumber) {
			alert(
				`${newName} is already added to the phonebook with that number`
			);
			return;
		}

		if (existingPerson) {
			const userConfirms = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			if (userConfirms) {
				updateExistingPerson(existingPerson, newNumber);
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};
			addNewPerson(personObject);
		}
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

			<Notification result={result} message={message} />

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
