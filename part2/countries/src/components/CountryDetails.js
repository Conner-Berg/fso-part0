const CountryDetails = ({ country }) => {
	const languages = Object.values(country.languages);
	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital[0]}</div>
			<p>area {country.area}</p>
			<h3>languages:</h3>
			<ul>
				{languages.map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.svg}
				alt={`${country.name.common} flag`}
				style={{ width: "150px" }}
			/>
		</div>
	);
};

export default CountryDetails;
