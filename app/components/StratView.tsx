import { useState } from "react";
import { Allocation, TokensProps } from "../utils/interface";

const StratView = ({ tokens }: TokensProps) => {
  // 1. Initialise un état pour les allocationes

  const [allocations, setAllocations] = useState<Allocation[]>([]);

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
              <button onClick={() => removeAllocation(index)}>Supprimer</button>
            </div>
          ),
        )}
        <button onClick={addAllocation}>+</button>
      </div>
    </div>
  );
};

export default StratView;
