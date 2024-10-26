"use client";
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
} from "@multiversx/sdk-dapp/UI";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div>
        <nav className="flex bg-cyan-100 items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-lg font-bold">
              Rebalance
            </a>
            <a href="/about" className="text-gray-600">
              About
            </a>
            <a href="/contact" className="text-gray-600">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleOpen} className="text-gray-600">
              Connect Wallet
            </button>
          </div>
        </nav>
      </div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Login with :</h2>
            <div>
              <ExtensionLoginButton
                loginButtonText="DeFi Wallet"
                onLoginRedirect={handleClose}
              />
              <WebWalletLoginButton loginButtonText="Web Wallet" />
              <LedgerLoginButton />
              <WalletConnectLoginButton loginButtonText="xPortal" />
            </div>
            <button
              onClick={handleClose}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
