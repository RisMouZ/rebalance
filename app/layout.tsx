"use client";

import "./globals.css";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers";
import {
  SignTransactionsModals,
  TransactionsToastList,
} from "@multiversx/sdk-dapp/UI";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DappProvider environment="mainnet">
      <SignTransactionsModals />
      <TransactionsToastList />
      <html lang="en">
        <body>{children}</body>
      </html>
    </DappProvider>
  );
}
