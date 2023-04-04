import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");

	return (
		<div>
			<div>
				Find countries{" "}
				<input
					type="text"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</div>
			{/* displayResult */}
		</div>
	);
};

export default App;
