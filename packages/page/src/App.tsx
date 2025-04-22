import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { IntegralCalculator } from "./Integral";

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>

      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Calculetes</h1>
        <IntegralCalculator />
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-gray-500">
        <p className="text-sm">Made with ❤️ by Eliaz Bobadilla</p>
        <p className="text-xs mt-1">{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
