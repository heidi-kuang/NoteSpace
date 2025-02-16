import './App.css';
import Uploader from './components/Uploader';
import logo from './assets/notespace-logo.svg';
import { Toaster } from './components/ui/toaster';


function App() {

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center p-6">
        <img
          src={logo}
          alt="NoteSpace logo"
          className="h-16 mb-4"
        />
        <h3 className="text-xl font-bold mb-4">NoteSpace</h3>
      </div>
      <div>
        <Uploader />
      </div>
    </>
  )
}

export default App
