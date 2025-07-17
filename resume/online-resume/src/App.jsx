import React from "react";
import { useState,useEffect } from "react";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load preference on first mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle and save preference
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-[#0d1117] dark:to-[#161b22] text-gray-800 dark:text-gray-200 p-6 transition-colors duration-300 font-sans">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm shadow hover:scale-105 transition"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Your Full Name</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            BTech Computer Engineering Student | MERN Stack | AI Enthusiast
          </p>
          <p className="mt-2 text-sm">
            📍 Patiala, India | ✉️ your.email@example.com |{" "}
            <a href="https://github.com/yourusername" className="text-blue-600 dark:text-blue-400 hover:underline">
              GitHub
            </a>
          </p>
        </header>

        {/* About Me */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 border-b pb-1 border-gray-300 dark:border-gray-600">
            About Me
          </h2>
          <div className="bg-white/80 dark:bg-[#1f2937] p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300">
            <p>
              I’m a 2nd-year BTech Computer Engineering student at Thapar University with a passion for building
              impactful software solutions. I’ve worked on AI and full-stack projects, and I enjoy learning by building.
              Currently diving deeper into the MERN stack and DSA.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 border-b pb-1 border-gray-300 dark:border-gray-600">
            Projects
          </h2>
          <div className="bg-white/80 dark:bg-[#1f2937] p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Real-Time Sign Language Detection:</strong> Built with Python, OpenCV & TensorFlow. AI system
                that interprets hand gestures in real-time.
              </li>
              <li>
                <strong>Bank Management System:</strong> Python & MySQL-based app to manage accounts, transactions, and
                users.
              </li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 border-b pb-1 border-gray-300 dark:border-gray-600">
            Skills
          </h2>
          <div className="bg-white/80 dark:bg-[#1f2937] p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300">
            <p>
              Python, C++, JavaScript, React, Node.js, Express.js, MongoDB, MySQL, Git, OpenCV, TensorFlow
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-3 border-b pb-1 border-gray-300 dark:border-gray-600">
            Contact
          </h2>
          <div className="bg-white/80 dark:bg-[#1f2937] p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300">
            <p>Email: your.email@example.com</p>
            <p>GitHub: https://github.com/yourusername</p>
            <p>LinkedIn: https://linkedin.com/in/yourlinkedin</p>
          </div>
        </section>

        {/* Resume Download */}
        <div className="text-center mt-6">
          <a
            href="/your-resume.pdf"
            download
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            Download Resume PDF
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
