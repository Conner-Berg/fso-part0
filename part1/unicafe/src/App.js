import { useState } from "react";

const Button = (props) => {
	return <button onClick={props.handleClick}>{props.value}</button>;
};

const Statistics = (props) => {
	return (
		<div>
			{props.value} {props.amount} {props.symbol}
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
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
			<div className="header">give feedback</div>
			<div>
				<Button handleClick={addGood} value="good" />
				<Button handleClick={addNeutral} value="neutral" />
				<Button handleClick={addBad} value="bad" />
			</div>
			<div className="header">statistics</div>
			<Statistics value="good" amount={good} />
			<Statistics value="neutral" amount={neutral} />
			<Statistics value="bad" amount={bad} />
			<Statistics value="all" amount={all} />
			<Statistics value="average" amount={isNaN(average) ? 0 : average} />
			<Statistics
				value="positive"
				amount={isNaN(positive) ? 0 : positive}
				symbol="%"
			/>
		</div>
	);
};

export default App;
