import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "@modules/Dashboard";
import { Navbar } from "@modules/Shared/layout";

function App() {
  return (
    <div className=" h-screen bg-bodyBg   ">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
