import CountryDetails from "./CountryDetails";

const DisplayResult = ({
	search,
	filteredCountries,
	shownCountry,
	setShownCountry,
}) => {
	if (search === "") {
		return "Enter a country name";
	} else if (filteredCountries.length > 10) {
		return "Too many matches, specify another filter";
	} else if (filteredCountries.length > 1) {
		return filteredCountries.map((country) => (
			<div key={country.cca3}>
				{country.name.common}{" "}
				<button onClick={() => setShownCountry(country)}>show</button>
				{shownCountry && shownCountry.cca3 === country.cca3 && (
					<CountryDetails country={shownCountry} />
				)}
			</div>
		));
	} else if (filteredCountries.length === 1) {
		return <CountryDetails country={filteredCountries[0]} />;
	} else {
		return "No matches";
	}
};

export default DisplayResult;
