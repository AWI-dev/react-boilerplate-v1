import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Provider from "./Provider.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Provider>
        <main className="text-foreground bg-background">
          <App />
        </main>
      </Provider>
    </Router>
  </StrictMode>
);
