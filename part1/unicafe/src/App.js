import { useState } from "react";

const Header = (props) => {
	return <div className="header">{props.value}</div>;
};

const Button = (props) => {
	return <button onClick={props.handleClick}>{props.value}</button>;
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
				addGood={addGood}
				addNeutral={addNeutral}
				addBad={addBad}
			/>
		</div>
	);
};

export default App;
