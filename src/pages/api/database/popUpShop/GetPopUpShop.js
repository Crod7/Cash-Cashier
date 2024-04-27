
import { clientPromise, databaseName } from "@/lib/database/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(databaseName);
        const collectionName = "PopUpShop";

        if (req.method === "GET") {
            const { PopUpShopID } = req.query;

            if (!PopUpShopID) {
                return res.status(400).json({ error: "PopUpShopID is required" });
            }

            let popUpShopData = await db.collection(collectionName).findOne({ PopUpShopID });
            if (popUpShopData) {
                return res.json(popUpShopData);
            } else {
                return res.json(null);
            }
        } else {
            return res.status(400).json({ error: "Bad Request" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred" });
    }
};
