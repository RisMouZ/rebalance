import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Définition du type de la réponse que l'API renvoie
type ApiResponse = {
  data: any; // Vous pouvez préciser un type plus précis selon la réponse de l'API externe
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>,
) {
  try {
    // Envoi de la requête vers l'API externe avec authentification
    const response = await axios.get(
      `https://multiversx-api.beaconx.app/api//tokens?size=10000
`,
      {
        auth: {
          username: "ecompass",
          password: "eyK6EwuT0AyIfaIpcv3uFwRyyXATbf",
        },
      },
    );

    // Renvoie de la réponse JSON de l'API externe au client
    res.status(200).json({ data: response.data });
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la requête vers l’API distante:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la requête vers l’API distante" });
  }
}
