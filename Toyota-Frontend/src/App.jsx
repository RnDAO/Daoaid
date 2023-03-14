import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Problems from "./pages/problems";
import ProposalDetail from "./pages/proposaldetail";
import Solutions from "./pages/solutions";
import SubmitProposal from "./pages/submitproposal";
import { Routes, Route } from "react-router-dom";
import ProblemSelectorModal from "./components/ProblemSelectorModal";
import CommentModal from "./components/CommentModal";
import VotingModal from "./components/VotingModal";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { login, register } from "./utils/auth";
import CommentFormModal from "./components/CommentFormModal";
import { setGlobalState, useGlobalState } from "./store";

import { Toaster } from "react-hot-toast";
function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log(isDisconnected);
  const [userId] = useGlobalState("userId");
  useEffect(() => {
    if (address) {
      //check if user is already logged in
      if (userId) return;
      login(address);
      setGlobalState("connectedAddress", address);
    } else {
      window.localStorage.removeItem("access_token");
      setGlobalState("connectedAddress", "");
      setGlobalState("userId", "");
    }
  }, [address]);

  return (
    <div className=" min-h-screen bg-bodyBg   ">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/proposal" element={<SubmitProposal />} />
        <Route path="/proposal/:id" element={<ProposalDetail />} />
      </Routes>
      <ProblemSelectorModal />
      <CommentModal />
      <VotingModal />
      <CommentFormModal />
    </div>
  );
}

export default App;
