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
  // const networkProvider = new ApiNetworkProvider(API_URL, { timeout: 10000 });
  const isLoggedIn = useGetIsLoggedIn();
  const [tokens, setTokens] = useState<any>();
  const [address, setAddress] = useState<any>();

  type ApiResponse = {
    data: any; // Adaptez ce type si vous connaissez la structure de la réponse
  };

  // const username = "ecompass";
  // const password = "eyK6EwuT0AyIfaIpcv3uFwRyyXATbf";
  // const url = "https://multiversx-api.beaconx.app/api/accounts/";

  // const basicAuth =
  //   "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

  const getTokens = async () => {
    await axios
      .get<ApiResponse>(`/api/tokens-user?address=${account.address}`)
      .then((response) => setTokens(response.data.data))
      .catch((error) => console.error("Erreur:", error));
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
