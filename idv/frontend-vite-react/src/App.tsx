import "./App.css";

function App() {
	const handleOpen = () => {
		footprint.init({
			kind: "verify",
			variant: "inline",
			containerId: "footprint-container",
			publicKey: "pb_test_5OJt1d7gDASCzgv7pZpLuB",
			onComplete: (validationToken: string) => {
				console.log(validationToken);
			},
		});
	};

	return (
		<>
			<main className="main">
				<div id="footprint-container" className="container" />
				<button type="button" onClick={handleOpen}>
					Verify
				</button>
			</main>
		</>
	);
}

export default App;
