import { useState } from "react";

const Header = ({ text }) => {
	return <div className="header">{text}</div>;
};

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	if (all === 0) return <div>No feedback given</div>;
	return (
		<div>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="all" value={all} />
			<StatisticLine text="average" value={average} />
			<StatisticLine text="positive" value={positive} symbol="%" />
		</div>
	);
};

const StatisticLine = ({ text, value, symbol }) => {
	return (
		<div>
			{text} {value} {symbol}
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
			<Header text="give feedback" />
			<Button handleClick={addGood} text="good" />
			<Button handleClick={addNeutral} text="neutral" />
			<Button handleClick={addBad} text="bad" />
			<Header text="statistics" />
			<Statistics
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
