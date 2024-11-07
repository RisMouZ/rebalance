import { useEffect, useState } from "react";
import { Allocation, TokensProps } from "../utils/interface";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { set } from "date-fns";
import { Button } from "@/components/ui/button";
import axios from "axios";

const StratView = ({ tokens }: TokensProps) => {
  // 1. Initialise un état pour les allocationes
  const { account } = useGetAccountInfo();
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [allocationsSaved, setAllocationsSaved] = useState<Allocation[][]>([]);
  const [indexOnChange, setIndexOnChange] = useState<number>(-1);
  const [tokenList, setTokenList] = useState<string[]>([]);

  useEffect(() => {
    const savedValue = localStorage.getItem(account.address);
    if (savedValue) {
      setAllocationsSaved(JSON.parse(savedValue));
    }
  }, [localStorage.getItem(account.address)]);

  useEffect(() => {
    getTokensList();
  }, []);

  const getTokensList = () => {
    axios.get("http://localhost:3004/tokens").then((res) => {
      setTokenList(res.data);
    });
    console.log("tokens list :", tokenList);
  };

  const saveToLocalStorage = () => {
    let newAllocationsSaved = [...allocationsSaved, allocations];
    setAllocationsSaved(newAllocationsSaved);
    localStorage.setItem(account.address, JSON.stringify(newAllocationsSaved));
    const savedValue = localStorage.getItem(account.address);
    if (savedValue) {
      setAllocationsSaved(JSON.parse(savedValue));
    }
  };

  const saveModifiedStrat = () => {
    let newAllocationsSaved = [...allocationsSaved];
    newAllocationsSaved[indexOnChange] = allocations;
    setAllocationsSaved(newAllocationsSaved);
    localStorage.setItem(account.address, JSON.stringify(newAllocationsSaved));
    const savedValue = localStorage.getItem(account.address);
    if (savedValue) {
      setAllocationsSaved(JSON.parse(savedValue));
    }
    setAllocations([]);
    setIndexOnChange(-1);
  };

  // 2. Fonction pour ajouter une nouvelle allocatione vide
  const addAllocation = () => {
    setAllocations([
      ...allocations,
      { ticker: "", identifier: "", percentage: 0 },
    ]);
  };

  // 3. Fonction pour mettre à jour une allocatione
  const updateAllocation = <K extends keyof Allocation>(
    index: number,
    key: K,
    value: Allocation[K],
  ) => {
    const newAllocations = [...allocations];
    newAllocations[index][key] = value;
    setAllocations(newAllocations);
  };

  // 4. Optionnel : Fonction pour supprimer une allocatione
  const removeAllocation = (index: any) => {
    setAllocations(allocations.filter((_: any, i: any) => i !== index));
  };

  // 5. Optionnel : Fonction pour valider les pourcentages
  const validatePercentages = () => {
    const totalPercentage = allocations.reduce(
      (total: any, allocation: { percentage: any }) =>
        total + allocation.percentage,
      0,
    );
    return totalPercentage <= 100;
  };

  return (
    <div className="m-2 basis-1/2 rounded bg-slate-300 p-3">
      {allocationsSaved[0] && (
        <div className="m-2 rounded-xl bg-slate-100 p-3">
          {allocationsSaved.map((allocation: Allocation[], index: number) => (
            <div className="m-1 flex flex-col items-center p-2" key={index}>
              <Table>
                <TableCaption>Strat # {index + 1}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                {allocation.map(
                  (
                    allocation: {
                      ticker: string | number | readonly string[] | undefined;
                      percentage:
                        | string
                        | number
                        | readonly string[]
                        | undefined;
                    },
                    index: number,
                  ) => (
                    <TableBody>
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {allocation.ticker}
                        </TableCell>
                        <TableCell className="text-right">
                          {allocation.percentage}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ),
                )}
              </Table>

              <Button
                className="mt-1 bg-slate-300 p-1"
                onClick={() => {
                  setAllocations(allocation);
                  setIndexOnChange(index);
                }}
              >
                Change Strat
              </Button>
            </div>
          ))}
        </div>
      )}
      {!allocationsSaved[indexOnChange] ? (
        <div className="m-2 rounded-xl bg-slate-100 p-3">
          {allocations.map(
            (
              allocation: {
                ticker: string | number | readonly string[] | undefined;
                percentage: string | number | readonly string[] | undefined;
              },
              index: number,
            ) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Nom"
                  value={allocation.ticker}
                  onChange={(e) =>
                    updateAllocation(index, "ticker", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Pourcentage"
                  value={allocation.percentage}
                  onChange={(e) =>
                    updateAllocation(
                      index,
                      "percentage",
                      parseFloat(e.target.value),
                    )
                  }
                />
                <button onClick={() => removeAllocation(index)}>
                  Supprimer
                </button>
              </div>
            ),
          )}
          <button onClick={addAllocation}>Add</button>
          <br />
          <button onClick={saveToLocalStorage}>Save Strat</button>
        </div>
      ) : (
        <div className="m-2 rounded-xl bg-slate-100 p-3">
          {allocations.map(
            (
              allocation: {
                ticker: string | number | readonly string[] | undefined;
                percentage: string | number | readonly string[] | undefined;
              },
              index: number,
            ) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Nom"
                  value={allocation.ticker}
                  onChange={(e) =>
                    updateAllocation(index, "ticker", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Pourcentage"
                  value={allocation.percentage}
                  onChange={(e) =>
                    updateAllocation(
                      index,
                      "percentage",
                      parseFloat(e.target.value),
                    )
                  }
                />
                <button onClick={() => removeAllocation(index)}>
                  Supprimer
                </button>
              </div>
            ),
          )}
          <button onClick={addAllocation}>Add</button>
          <br />
          <button onClick={saveModifiedStrat}>Save Modif</button>
        </div>
      )}
    </div>
  );
};

export default StratView;
