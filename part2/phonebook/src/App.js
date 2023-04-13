import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Notification from "./components/Notification";
import personService from "./services/personService";

const App = () => {
	const [people, setPeople] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personService
			.getAll()
			.then((initialPeople) => setPeople(initialPeople));
	}, []);

	const addNewPerson = (personObject) => {
		personService
			.create(personObject)
			.then((returnedPerson) => {
				setPeople(people.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
				getSuccess(returnedPerson.name);
			})
			.catch((error) => getValidationError(error));
	};

	const updateExistingPerson = (existingPerson, newNumber) => {
		const updatedPerson = { ...existingPerson, number: newNumber };
		personService
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
				getAlreadyRemovedError(existingPerson.name);
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

	const getAlreadyRemovedError = (person) => {
		setResult("error");
		setMessage(
			`Information of ${person} has already been removed from server`
		);
		setTimeout(() => {
			setResult(null);
		}, 5000);
	};

	const getValidationError = (error) => {
		const regexError = /ValidationError[^<]*/;
		const regexMessage = /\(`[^`]+`\).*\(\d+\)./;
		const validationError = error.response.data.match(regexError)[0];
		const userMessage = error.response.data.match(regexMessage)[0];
		console.log(validationError);
		setResult("error");
		setMessage(userMessage);
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
			personService.remove(person.id).then(() => {
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
