"use client";

import { Address } from "@multiversx/sdk-core/out";
import Navbar from "./components/Navbar";
import { FormatAmount } from "@multiversx/sdk-dapp/UI";
import {
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetNetworkConfig,
} from "@multiversx/sdk-dapp/hooks";
import { API_URL } from "./config";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { useEffect, useState } from "react";
import axios from "axios";
import WalletView from "./components/WalletView";
import StratView from "./components/StratView";

export default function Home() {
  const { account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const networkProvider = new ApiNetworkProvider(API_URL, { timeout: 10000 });
  const isLoggedIn = useGetIsLoggedIn();
  const [tokens, setTokens] = useState<any>();
  const [address, setAddress] = useState<any>();

  const getTokens = async () => {
    axios
      .get(
        `https://api.elrond.com/accounts/${account.address}/tokens?size=10000
`,
      )
      .then((res) => {
        setTokens(res.data);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      setAddress(Address.fromBech32(account?.address));
    }
    getTokens();
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className="m-3 mt-20 flex w-auto items-center justify-center">
        {isLoggedIn ? (
          <>
            <WalletView tokens={tokens} />
            <StratView tokens={tokens} />
          </>
        ) : (
          <>Take a Log Bro !</>
        )}
      </div>
    </>
  );
}

// Afficher valeur en $ de chaque token (appel API ? )
