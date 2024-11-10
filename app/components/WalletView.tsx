import { ApiNetworkProvider } from "@multiversx/sdk-core/out";
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetIsLoggedIn,
  useGetEgldPrice,
} from "@multiversx/sdk-dapp/hooks";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { FormatAmount } from "@multiversx/sdk-dapp/UI";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { TokensProps } from "../utils/interface";

const WalletView = ({ tokens }: TokensProps) => {
  const { account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const { price } = useGetEgldPrice();
  const isLoggedIn = useGetIsLoggedIn();
  // const [tokens, setTokens] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [seeLowCap, setSeeLowCap] = useState(false);

  //   const getTokens = async () => {
  //     axios
  //       .get(
  //         `https://api.elrond.com/accounts/${account.address}/tokens?size=10000
  // `,
  //       )
  //       .then((res) => {
  //         setTokens(res.data);
  //       });
  //   };
  // console.log("network", network);
  // console.log("account", account);
  // console.log("price", price);

  useEffect(() => {
    // getTokens();
  }, [isLoggedIn]);

  return (
    <div className="m-2 basis-1/2 rounded bg-slate-300 p-3">
      <div className="m-2 rounded-xl bg-slate-100 p-3">
        <div className="my-2 flex items-center justify-end space-x-2">
          <Checkbox
            id="lowBalance"
            onClick={() => setSeeLowCap((prev) => !prev)}
          />
          <label
            htmlFor="lowBalance"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show low balances{" "}
          </label>
        </div>
        <Table>
          <TableCaption>Wallet content</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={network.egldLabel}>
              <TableCell className="font-medium">{network.egldLabel}</TableCell>
              <TableCell>
                {" "}
                {(
                  Number(account.balance) / Math.pow(10, network.decimals)
                ).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {price
                  ? (
                      price *
                      (Number(account.balance) / Math.pow(10, network.decimals))
                    ).toFixed(2)
                  : "N/A"}
              </TableCell>
            </TableRow>
            {tokens?.map((token: any) =>
              seeLowCap
                ? token.price && (
                    <TableRow key={token.identifier}>
                      <TableCell className="font-medium">
                        {token.ticker}
                      </TableCell>
                      <TableCell>
                        {(
                          Number(token.balance) / Math.pow(10, token.decimals)
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {(
                          token.price *
                          (Number(token.balance) / Math.pow(10, token.decimals))
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )
                : token.price &&
                  token.price *
                    (Number(token.balance) / Math.pow(10, token.decimals)) >
                    2 && (
                    <TableRow key={token.identifier}>
                      <TableCell className="font-medium">
                        {token.ticker}
                      </TableCell>
                      <TableCell>
                        {(
                          Number(token.balance) / Math.pow(10, token.decimals)
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {(
                          token.price *
                          (Number(token.balance) / Math.pow(10, token.decimals))
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WalletView;
