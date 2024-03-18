import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ViewCards from "./Pages/ViewCards";
import CreateCard from "./Pages/CreateCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/cards", element: <ViewCards /> },
  { path: "/cards/create", element: <CreateCard /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
