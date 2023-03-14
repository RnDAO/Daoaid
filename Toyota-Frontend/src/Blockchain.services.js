//communication with blockchain enters here
// import Web3 from "web3";

import { toast } from "react-hot-toast";
import { setGlobalState } from "./store";

const { ethereum } = window;
// window.web3 = new Web3(ethereum);
// window.web3 = new Web3(window.web3.currentProvider);

export const verifyNetwork = () => {
  if (window.ethereum.networkVersion != 592)
    toast.error("Please switch to Astar network.");
};

export const connectWallet = async () => {
  if (window.ethereum.networkVersion != 592) {
    toast.error("Please switch to Astar network.");
    return;
  }
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    setGlobalState("connectedAddress", accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};
export const disConnectWallet = async () => {
  window.localStorage.removeItem("access_token");
  setGlobalState("connectedAddress", "");
  setGlobalState("userId", "");
  window.location.reload();
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });
    // //console.log(accounts);
    // window.ethereum.on("accountsChanged", async () => {
    //   setGlobalState("connectedAccount", accounts[0].toLowerCase());
    //   await isWallectConnected();
    // });

    if (accounts.length) {
      setGlobalState("connectedAddress", accounts[0].toLowerCase());
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    console.log(error);
  }
};
