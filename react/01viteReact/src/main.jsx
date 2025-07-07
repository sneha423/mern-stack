import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
function MyApp() {
  return (
    <div>
      <h1>custom function</h1>
    </div>
  );
}
//object can't be used as such
// const ReactElemnet = {
//   type: "a",
//   props: {
//     href: "https://google.com",
//     target: "_blank",
//   },
//   children: "click me to visit google",
// };

const anotherElement = (
  <a href="https://google.com" target="_blank">
    visit google
  </a>
);
const anotherUser='amita'
//this is the react syntax of adding an element
//we first add basic html,then waht we want to display and then variables
const ReactElemnet = React.createElement(
  "a",
  {
    href: "https://google.com",
    target: "_blank",
  },
  "click to go to google",
  anotherUser
);
createRoot(document.getElementById("root")).render(
  ReactElemnet 
);
