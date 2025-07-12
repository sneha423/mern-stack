import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouteProvider } from "react-router";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },{
        path:'',
        element:<AboutUs/>
      }
    ]
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouteProvider router={router} />
  </StrictMode>
);
