import { useState } from "react";

const Header = ({ text }) => {
	return <div className="header">{text}</div>;
};

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text} </button>;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(Array(8).fill(0));
	// get currentSelected to equal random int 0-7
	const [currentSelected, setCurrentSelected] = useState(
		Math.floor(Math.random() * selected.length)
	);
	const [mostVotes, setMostVotes] = useState(0);

	const addVote = () => {
		const newArray = [...selected];
		newArray[currentSelected] += 1;
		setSelected(newArray);

		if (newArray[currentSelected] > newArray[mostVotes]) {
			setMostVotes(currentSelected);
		}
	};

	const getRandomAnecdote = () => {
		const newIndex = Math.floor(Math.random() * selected.length);
		setCurrentSelected(newIndex);
	};

	return (
		<div>
			<Header text="Anecdote of the day" />
			<div>{anecdotes[currentSelected]}</div>
			<div>has {selected[currentSelected]} votes</div>
			<Button handleClick={addVote} text="vote" />
			<Button handleClick={getRandomAnecdote} text="next anecdote" />
			<Header text="Anecdote with most votes" />
			<div>{anecdotes[mostVotes]} </div>
			<div>has {selected[mostVotes]} votes</div>
		</div>
	);
};

export default App;
