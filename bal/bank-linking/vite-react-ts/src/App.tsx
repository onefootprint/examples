import { bankLinking } from "@onefootprint/footprint-js";
import "./App.css";

function App() {
	const handleClick = () => {
		const authToken = window.prompt("Please enter your auth token:");
		if (!authToken) return;
		bankLinking.launchWithAuthToken({
			authToken,
			onSuccess: ({ validationToken }) => {
				console.log("linkId", validationToken);
			},
			onError: (error) => {
				console.error("error", error);
			},
			onClose: () => {
				console.log("closed");
			},
		});
	};

	return (
		<>
			<button type="button" onClick={handleClick}>
				Launch
			</button>
		</>
	);
}

export default App;
