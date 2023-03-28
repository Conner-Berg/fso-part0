import { useState } from "react";

const Button = (props) => {
	return <button onClick={props.handleClick}>{props.value}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

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
			<div>good {good} </div>
			<div>neutral {neutral} </div>
			<div>bad {bad}</div>
			<div>all {good + neutral + bad} </div>
			<div>average {isNaN(average) ? 0 : average} </div>
			<div>positive {isNaN(positive) ? 0 : positive} % </div>
		</div>
	);
};

export default App;
