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
        `https://api.elrond.com/accounts/erd1lzrec03dgwqm2qt4kqa4w2fpcaqz9pm8phu8law9xx9r7hkksscqez9tdr/tokens?size=10000
`
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

  console.log(tokens);

  return (
    <>
      <Navbar />
      <div className="justify-center flex items-center pt-20 flex-col">
        {isLoggedIn ? (
          <>
            Your balance :{" "}
            {/* <FormatAmount
              value={account.balance}
              egldLabel={network.egldLabel}
            />
            <br />
            <br />
            Your tokens :
            {tokens?.map((token: any) => (
              <div key={token.identifier}>
                {token.rawResponse.ticker} :{" "}
                {(
                  Number(token.rawResponse.balance) /
                  Math.pow(10, token.rawResponse.decimals)
                ).toFixed(2)}{" "}
              </div>
            ))} */}
          </>
        ) : (
          <>Take a Log Bro !</>
        )}
      </div>
    </>
  );
}

// Afficher valeur en $ de chaque token (appel API ? )
