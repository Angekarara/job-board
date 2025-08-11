import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}

startApp();
