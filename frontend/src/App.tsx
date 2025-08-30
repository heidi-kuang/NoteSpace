import './App.css';
import logo from './assets/notespace-logo.svg';
import { Toaster } from './components/ui/toaster';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import PDFProcessor from './components/PDFProcessor';
import FeedbackFloatingButton from './components/FeedbackFloatingButton';

const changeFavicon = (isDarkMode: boolean) => {
  console.log ("isDarkMode:", isDarkMode);
  const favicon = document.getElementById('favicon') as HTMLLinkElement
  if (favicon) {
    favicon.href = isDarkMode ? '/notespace-logo-white.svg' : '/notespace-logo.svg'
  }
}

function App() {
  useEffect(() => {
    // Detect system dark mode
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    changeFavicon(darkMode);
  }, []);

  return (
    <>
      <Analytics />
      <Toaster />
      <FeedbackFloatingButton />
      <div className="flex flex-col items-center p-6">
        <img
          src={logo}
          alt="NoteSpace logo"
          className="h-16 mb-4"
        />
        <h3 className="text-xl font-bold mb-4">NoteSpace</h3>
      </div>
      <div>
        <PDFProcessor />
      </div>
      {/* <Debug /> */}
    </>
  )
}

export default App
