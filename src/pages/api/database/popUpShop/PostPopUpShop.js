
import { clientPromise, databaseName } from "@/lib/database/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(databaseName);
        const collectionName = "PopUpShop";

        if (req.method === "POST") {
            const popUpShopData = req.body;

            const result = await db.collection(collectionName).insertOne(popUpShopData);

            if (result) {
                res.status(201).json({ message: "PopUpShop created successfully" });
            } else {
                res.status(500).json({ error: "PopUpShop creation failed" });
            }
        } else {
            res.status(400).json({ error: "Bad Request" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
