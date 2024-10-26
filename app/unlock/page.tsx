"use client";
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
} from "@multiversx/sdk-dapp/UI";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <ExtensionLoginButton loginButtonText="DeFi Wallet" />
        <WebWalletLoginButton loginButtonText="Web Wallet" />
        <LedgerLoginButton />
        <WalletConnectLoginButton loginButtonText="xPortal" />
      </div>
    </div>
  );
};

export default page;
