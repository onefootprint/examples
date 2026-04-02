import "@onefootprint/footprint-js/dist/footprint-js.css";
import { onboarding } from "@onefootprint/footprint-js";
import "./App.css";

function App() {
	const handleOpen = () => {
		const token = window.prompt("Enter your onboarding session token:");
		if (!token) return;

		onboarding.initialize({
			onboardingSessionToken: token,
			onComplete: (validationToken) => {
				console.log("onComplete", validationToken);
			},
			onAuth(validationToken) {
				console.log("onAuth", validationToken);
			},
			onCancel() {
				console.log("onCancel");
			},
			onClose() {
				console.log("onClose");
			},
			onError(error) {
				console.error("onError", error);
			},
			appearance: {
				variant: "inline",
				variables: {
					borderRadius: "5px",
					buttonBorderRadius: "20px",
					buttonPrimaryBg: "#666666",
					buttonPrimaryHoverBg: "#333333",
					buttonPrimaryColor: "#FFF",
					linkButtonColor: "#007BFF",
				},
				rules: {
					button: {
						transition: "all .2s linear",
						backgroundColor: "#666666",
						color: "#FFF",
						borderRadius: "20px",
					},
					"button:hover": {
						backgroundColor: "#333333",
						color: "#FFF",
					},
					"button:focus": {
						outline: "2px solid #999999",
						outlineOffset: "2px",
					},
					"button:active": {
						backgroundColor: "#333333",
						transform: "scale(0.98)",
					},
					input: {
						border: "1px solid #CCCCCC",
						borderRadius: "5px",
						padding: "8px",
					},
					"input:hover": {
						borderColor: "#999999",
					},
					"input:focus": {
						borderColor: "#666666",
						outline: "none",
						boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
					},
					"input:active": {
						borderColor: "#333333",
					},
					"pinInput:hover": {
						borderColor: "#999999",
					},
					"pinInput:focus": {
						borderColor: "#666666",
						outline: "none",
						boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
					},
					"pinInput:active": {
						borderColor: "#333333",
					},
					label: {
						color: "#666666",
						fontSize: "14px",
					},
					hint: {
						color: "#999999",
						fontSize: "12px",
					},
					link: {
						color: "#007BFF",
						textDecoration: "none",
					},
					"link:hover": {
						color: "#0056b3",
						textDecoration: "underline",
					},
					"link:active": {
						color: "#004085",
					},
				},
			},
		});
	};

	return (
		<main className="main">
			<button type="button" onClick={handleOpen}>
				Start Hosted Flow Demo
			</button>
		</main>
	);
}

export default App;
