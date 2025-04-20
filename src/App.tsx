import { JSX } from "react";

function App(): JSX.Element {

  return (
    <div className="relative bg-[url('./assets/play-ground.jpg')] bg-cover bg-center w-full h-screen">
      {/* overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
    </div>
  )
}

export default App
