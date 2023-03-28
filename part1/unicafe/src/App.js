import { useState } from "react";

const Header = ({ value }) => {
	return <div className="header">{value}</div>;
};

const Button = ({ handleClick, value }) => {
	return <button onClick={handleClick}>{value}</button>;
};

const Feedback = ({ good, neutral, bad, all, average, positive }) => {
	if (all === 0) return <div>No feedback given</div>;
	return (
		<div>
			<Statistics value="good" amount={good} />
			<Statistics value="neutral" amount={neutral} />
			<Statistics value="bad" amount={bad} />
			<Statistics value="all" amount={all} />
			<Statistics value="average" amount={average} />
			<Statistics value="positive" amount={positive} symbol="%" />
		</div>
	);
};

const Statistics = ({ value, amount, symbol }) => {
	return (
		<div>
			{value} {amount} {symbol}
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const all = good + neutral + bad;
	const average = (good - bad) / (good + neutral + bad);
	const positive = (good / (good + neutral + bad)) * 100;

	const addGood = () => setGood(good + 1);
	const addNeutral = () => setNeutral(neutral + 1);
	const addBad = () => setBad(bad + 1);

	return (
		<div>
			<Header value="give feedback" />
			<Button handleClick={addGood} value="good" />
			<Button handleClick={addNeutral} value="neutral" />
			<Button handleClick={addBad} value="bad" />
			<Header value="statistics" />
			<Feedback
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
