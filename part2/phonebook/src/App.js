import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Notification from "./components/Notification";
import peopleDB from "./services/peopleDB";

const App = () => {
	const [people, setPeople] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		peopleDB.getAll().then((initialPeople) => setPeople(initialPeople));
	}, []);

	const addNewPerson = (personObject) => {
		peopleDB.create(personObject).then((returnedPerson) => {
			setPeople(people.concat(returnedPerson));
			setNewName("");
			setNewNumber("");
			getSuccess(returnedPerson.name);
		});
	};

	const updateExistingPerson = (existingPerson, newNumber) => {
		const updatedPerson = { ...existingPerson, number: newNumber };
		peopleDB
			.update(updatedPerson.id, updatedPerson)
			.then((returnedPerson) => {
				setPeople(
					people.map((person) =>
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
				setPeople(
					people.filter((person) => person.id !== existingPerson.id)
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

		const existingPerson = people.find((person) => person.name === newName);

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

	const filteredPeople = people.filter((person) =>
		person.name.toLowerCase().includes(search.toLowerCase())
	);

	const removePerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			peopleDB.remove(person.id).then(() => {
				setPeople(people.filter((p) => p.id !== person.id));
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

			<People people={filteredPeople} removePerson={removePerson} />
		</div>
	);
};

export default App;
