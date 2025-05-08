import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "https://unpkg.com/@onefootprint/footprint-js@4.0.1/dist/footprint-js.js";

const rootEl = document.getElementById("root");
if (!rootEl) {
	throw new Error("Root element not found");
}

createRoot(rootEl).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
