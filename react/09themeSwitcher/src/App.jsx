import { useEffect, useState } from "react";

import "./App.css";
import { ThemeProvider } from "./Contexts/Theme";
import ThemeBtn from "./Components/Themebtn";
import Card from "./Components/Card";

function App() {
  const [themeMode, setThemeMode] = useState('light');
  const darkTheme=()=>{
    setThemeMode('dark')
  }
  const lightTheme=()=>{
    setThemeMode('light')
  }

  //actual change in a theme
  useEffect(()=>{
    const change=document.querySelector('html').classList
    change.remove('light','dark')
    change.add(themeMode)
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode,darkTheme,lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
