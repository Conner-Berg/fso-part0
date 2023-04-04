import { useState, useEffect } from "react";
import axios from "axios";
import DisplayResult from "./components/DisplayResult";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [shownCountry, setShownCountry] = useState(null);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	);

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
			<DisplayResult
				search={search}
				filteredCountries={filteredCountries}
				shownCountry={shownCountry}
				setShownCountry={setShownCountry}
			/>
		</>
	);
};

export default App;
