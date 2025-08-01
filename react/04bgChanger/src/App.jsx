import { useState } from "react";

function App() {
  const [color, setColor] = useState("pink");

  return (
    <>
      <div
        className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        <div className="fixed flex flex-wrap justify-center bottom-10 inset-x-0 px-3">
          <div className="flex flex-wrap gap-3 justify-center shadow-lg bg-white px-2 py-2 rounded-xl">
            <button
              onClick={() => {
                setColor("red");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "red" }}
            >
              Red
            </button>
            <button
              onClick={() => {
                setColor("green");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "green" }}
            >
              Green
            </button>
            <button
              onClick={() => {
                setColor("purple");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "purple" }}
            >
              Purple
            </button>
            <button
              onClick={() => {
                setColor("yellow");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "yellow" }}
            >
              Yelllow
            </button>
            <button
              onClick={() => {
                setColor("blue");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "blue" }}
            >
              Blue
            </button>
            <button
              onClick={() => {
                setColor("black");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "black" }}
            >
              Black
            </button>
            <button
              onClick={() => {
                setColor("lavender");
              }}
              className="outline-none px-1 rounded-full text-black shadow-lg"
              style={{ backgroundColor: "lavender" }}
            >
              Lavender
            </button>
            <button
              onClick={() => {
                setColor("white");
              }}
              className="outline-none px-1 rounded-full text-blackshadow-lg"
              style={{ backgroundColor: "white" }}
            >
              White
            </button>
            <button
              onClick={() => {
                setColor("brown");
              }}
              className="outline-none px-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "brown" }}
            >
              Brown
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
