import { useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "![]@#$%^&*()-_=+{};:,./<>?";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, length, setPassword]);

  return (
    <>
    <div className="w-full max-w-md mx-auto rounded-lg bg-red-500 text-orange-200" >
      <h1 className="w-full max-w-md text-4xl  text-center align-middle">
        Password Generator
      </h1>
      <div
        className=" px-2 py-2 my-4 text-black rounded-lg justify-center w-full align-middle"
        style={{ backgroundColor: "lavender" }}
      >
        <input type="text" value={password} className="outline-none w-full align-middle py-1 px-3 " placeholder="password"
        readOnly/>
        <button className="border-spacing-3 outline-double bg-purple-600 text-red-400">copy</button>
        <div
          className="text-wrap gap-3 justify-center text-white"
          
        >
          
          <button className="shadow-md rounded-full">numbers</button>
          <button className="shadow-md rounded-full">special char</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
