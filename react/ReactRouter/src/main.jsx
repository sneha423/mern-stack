import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./components/home/Home.jsx";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import Contact from "./components/contactUs/Contact.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<Layout/>,
//     children:[
//       {
//         path:'',
//         element:<Home/>
//       },{
//         path:'about',
//         element:<AboutUs/>
//       },{
//         path:'contact',
//         element:<Contact/>
//       }
//     ]
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />}></Route>
      <Route path="about" element={<AboutUs/>}></Route>
      <Route path="contact" element={<Contact/>}></Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
