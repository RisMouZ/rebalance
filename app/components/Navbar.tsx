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
        <nav className="relative flex items-center justify-center bg-cyan-100 p-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-lg font-bold">
              Rebalance
            </a>
          </div>
          <div className="absolute right-5 flex items-center gap-4">
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
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Login with :</h2>
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
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
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
