import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	);

	const displayResult = () => {
		return filteredCountries.map((country) => (
			<div key={country.cca3}>{country.name.common}</div>
		));
	};

	return (
		<>
			<div>
				Find countries{" "}
				<input
					type="text"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</div>
			<div>{displayResult()}</div>
		</>
	);
};

export default App;
