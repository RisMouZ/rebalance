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
import { Button } from "@/components/ui/button";
import axios from "axios";

const StratView = ({ tokens }: TokensProps) => {
  // 1. Initialise un état pour les allocationes
  const { account } = useGetAccountInfo();
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [allocationsSaved, setAllocationsSaved] = useState<Allocation[][]>([]);
  const [indexOnChange, setIndexOnChange] = useState<number>(-1);
  const [identifiersList, setIdentifiersList] = useState<string[]>([]);

  useEffect(() => {
    const savedValue = localStorage.getItem(account.address);
    if (savedValue) {
      setAllocationsSaved(JSON.parse(savedValue));
    }
  }, [localStorage.getItem(account.address)]);

  useEffect(() => {
    getIdentifiersList()
      .then((tokens) => {
        let identifiersList: string[] = [];
        tokens.forEach((token: any) => {
          identifiersList.push(token.token.id);
        });
        setIdentifiersList(identifiersList);
        console.log("identifiersList", identifiersList);
      })
      .catch((error) => {
        console.error("Erreur générale:", error);
      });
  }, []);

  const getIdentifiersList = async () => {
    const baseUrl = "https://data-api.mvx.fr/tokens";
    const pageSize = 100;
    let from = 1;
    let allTokens: any[] = [];
    let hasMoreData = true;

    try {
      while (hasMoreData) {
        const url = `${baseUrl}?from=${from}&size=${pageSize}`;

        const response = await axios.get(url);

        const tokens = response.data;

        if (tokens && tokens.length > 0) {
          allTokens = allTokens.concat(tokens);
          from += pageSize;
        } else {
          hasMoreData = false;
        }
      }

      console.log("Toutes les données ont été récupérées.");
      console.log("allTokens", allTokens);

      return allTokens;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erreur lors de la récupération des données:",
          error.message,
        );
      } else {
        console.error("Erreur lors de la récupération des données:", error);
      }
      throw error; // Relancer l'erreur pour qu'elle puisse être gérée en amont
    }
  };

  // .then((res) => {
  //   console.log("res :", res.data);

  //   let identifiersList: string[] = [];
  //   res.data.data.forEach((token: any) => {
  //     identifiersList.push(token.identifier);
  //   });
  //   setIdentifiersList(identifiersList);
  // });
  //   }
  // };

  console.log("identifiersList", identifiersList);

  const saveToLocalStorage = () => {
    let newAllocationsSaved = [...allocationsSaved, allocations];
    setAllocationsSaved(newAllocationsSaved);
    localStorage.setItem(account.address, JSON.stringify(newAllocationsSaved));
    setAllocations([]);
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
    setAllocations([...allocations, { identifier: "", percentage: 0 }]);
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

  console.log("allocations", allocationsSaved);

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
                      identifier: string | undefined;
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
                          {allocation.identifier}
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
                identifier: string | undefined;
                percentage: number | undefined;
              },
              index: number,
            ) => (
              <div key={index}>
                <input
                  type="text"
                  list={`tokens-${index}`} // Unique ID for the datalist to avoid conflicts if there are multiple inputs
                  placeholder="Nom"
                  value={allocation.identifier}
                  onChange={(e) =>
                    updateAllocation(index, "identifier", e.target.value)
                  }
                />
                <datalist id={`tokens-${index}`}>
                  {identifiersList
                    .sort((a, b) => a.length - b.length)
                    .map((identifier) => (
                      <option
                        key={identifier}
                        value={identifier.split("-")[0]}
                      />
                    ))}
                </datalist>
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
                <Button onClick={() => removeAllocation(index)}>
                  Supprimer
                </Button>
              </div>
            ),
          )}
          <Button className="mt-1 bg-slate-300 p-1" onClick={addAllocation}>
            Add
          </Button>
          <br />
          <Button
            className="mt-1 bg-slate-300 p-1"
            onClick={saveToLocalStorage}
          >
            Save Strat
          </Button>
        </div>
      ) : (
        <div className="m-2 rounded-xl bg-slate-100 p-3">
          {allocations.map(
            (
              allocation: {
                identifier: string | undefined;
                percentage: number | undefined;
              },
              index: number,
            ) => (
              <div key={index}>
                <input
                  type="text"
                  list={`tokens-${index}`} // Unique ID for the datalist to avoid conflicts if there are multiple inputs
                  placeholder="Nom"
                  value={allocation.identifier}
                  onChange={(e) =>
                    updateAllocation(index, "identifier", e.target.value)
                  }
                />
                <datalist id={`tokens-${index}`}>
                  {identifiersList
                    .sort((a, b) => a.length - b.length)
                    .map((identifier) => (
                      <option
                        key={identifier}
                        value={identifier.split("-")[0]}
                      />
                    ))}
                </datalist>
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
                <Button onClick={() => removeAllocation(index)}>
                  Supprimer
                </Button>
              </div>
            ),
          )}
          <Button className="mt-1 bg-slate-300 p-1" onClick={addAllocation}>
            Add
          </Button>
          <br />
          <Button className="mt-1 bg-slate-300 p-1" onClick={saveModifiedStrat}>
            Save Modif
          </Button>
        </div>
      )}
    </div>
  );
};

export default StratView;
