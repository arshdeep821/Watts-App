import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import Header from "./Header";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
);
