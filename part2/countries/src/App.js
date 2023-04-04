import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

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
		if (search === "") {
			return "Enter a country name";
		} else if (filteredCountries.length > 10) {
			return "Too many matches, specify another filter";
		} else if (filteredCountries.length > 1) {
			return filteredCountries.map((country) => (
				<div key={country.cca3}>{country.name.common}</div>
			));
		} else if (filteredCountries.length === 1) {
			return <CountryDetails country={filteredCountries[0]} />;
		} else {
			return "No matches";
		}
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
