const Header = ({ courseName }) => {
	return <h1>{courseName}</h1>;
};

const Part = ({ courseParts }) => {
	return (
		<p>
			{courseParts.name} {courseParts.exercises}
		</p>
	);
};

const Content = ({ courseParts }) => {
	return (
		<div>
			<Part courseParts={courseParts[0]} />
			<Part courseParts={courseParts[1]} />
			<Part courseParts={courseParts[2]} />
		</div>
	);
};

const Total = ({ courseParts }) => {
	return (
		<p>
			Number of exercises{" "}
			{courseParts[0].exercises +
				courseParts[1].exercises +
				courseParts[2].exercises}
		</p>
	);
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header courseName={course.name} />
			<Content courseParts={course.parts} />
			<Total courseParts={course.parts} />
		</div>
	);
};

export default App;
