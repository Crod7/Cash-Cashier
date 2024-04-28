// We iterate through each PopUpShop and find the highest value for the ID. We then increase it by 1 and return that.

import { clientPromise, databaseName } from "@/lib/database/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(databaseName);
        const collectionName = "PopUpShop";

        if (req.method === "GET") {

            let maxPopUpShopID = 0;

            // Iterate through each document in the collection
            await db.collection(collectionName).find().forEach(doc => {
                const currentPopUpShopID = doc.PopUpShopID;
                if (currentPopUpShopID > maxPopUpShopID) {
                    maxPopUpShopID = currentPopUpShopID;
                }
            });

            return res.json({ PopUpShopID: maxPopUpShopID });

        } else {
            return res.status(400).json({ error: "Bad Request, Only a GET request is allowed for src.pages.api.database.popUpShop.GeneratePopUpShopID" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred at src.pages.api.database.popUpShop.GeneratePopUpShopID" });
    }
};
