import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const api_key = process.env.REACT_APP_API_KEY;
	const capital = country.capital[0];
	const languages = Object.values(country.languages);

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
			)
			.then((response) => {
				setWeather(response.data);
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error);
			});
	}, [capital, api_key]);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {capital}</div>
			<div>area {country.area}</div>
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
			{weather && (
				<div>
					<h3>Weather in {capital}</h3>
					<p>temperature {weather.main.temp.toFixed(2)} Celsius</p>
					<img
						src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
						alt={weather.weather[0].description}
						width="100px"
						height="100px"
					/>
					<p>wind {weather.wind.speed} m/s</p>
				</div>
			)}
		</div>
	);
};

export default CountryDetails;
