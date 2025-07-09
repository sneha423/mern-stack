import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef=useRef(null)

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

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);
  return (
    <>
      <div className="min-h-screen items-center rounded-lg justify-center bg-red-500  text-orange-200 max-w-md">
        <h1 className="w-full max-w-md text-4xl  text-center align-middle">
          Password Generator
        </h1>

        <div
          className=" px-2 py-2 my-4 text-black rounded-lg justify-center w-full align-middle flex gap-4"
          style={{ backgroundColor: "lavender" }}
        >
          <input
            type="text"
            value={password}
            className="outline-none w-full align-middle py-1 px-3 text-white "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard} className="border-spacing-3 outline-double bg-purple-600 text-red-400">
            copy
          </button>
        </div>

        <div className="text-wrap gap-5 justify-center text-black flex gap-4">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Special char</label>
        </div>
      </div>
    </>
  );
}

export default App;
