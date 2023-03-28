import { useState } from "react";

const Button = (props) => {
	return <button>{props.value}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<div className="header">give feedback</div>
			<div>
				<Button value="good" />
				<Button value="neutral" />
				<Button value="bad" />
			</div>
			<div className="header">statistics</div>
			<div>good </div>
			<div>neutral </div>
			<div>bad </div>
			<div>all </div>
			<div>average </div>
			<div>positive </div>
		</div>
	);
};

export default App;
