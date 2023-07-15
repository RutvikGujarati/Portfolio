
import { useState } from "react";
import ABI from "./ABI.json";
import Web3 from "web3";
import "./Wallet.css";
import PropTypes from "prop-types";

const Wallet = ({ saveState }) => {
  const [connected, setConnected] = useState(true);
  const isAndroid = /android/i.test(navigator.userAgent);

  const init = async () => {
    try {
      if (window.ethereum) {
        // Check if Ethereum provider is available
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = new web3.eth.Contract(
          ABI,
          "0x56B484b4ad4f5CaD851B1D0bBe2f036E7a8EB046"
        );
        setConnected(false);
        saveState({ web3: web3, contract: contract });
      } else {
        throw new Error("Ethereum provider not found");
      }
    } catch (error) {
      alert("Please Install Metamask");
    }
  };

  return (
    <>
      <div className="header">
        {isAndroid && (
          <button className="connectBTN">
            <a href="https://metamask.app.link/dapp/sriche.netlify.app/">
              Click For Mobile
            </a>
          </button>
        )}
        <button className="connectBTN" onClick={init} disabled={!connected}>
          {connected ? "Connect Metamask" : "Connected"}
        </button>
      </div>
    </>
  );
};

Wallet.propTypes = {
  saveState: PropTypes.func.isRequired, // Define prop types for the saveState prop
};

export default Wallet;
