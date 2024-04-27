// Checks to see if a user exists in the database by email. Returns true or false. 

import { clientPromise, databaseName } from "@/lib/database/mongodb";


export default async (req, res) => {

    try {
        const client = await clientPromise;
        const db = client.db(databaseName);
        const collectionName = "PopUpShop";

        if (req.method === "PATCH") {
            const PopUpShopID = req.query.PopUpShopID;


            if (!PopUpShopID) {
                return res.status(400).json({ error: "PopUpShopID is required" });
            }

            const existingPopUpShop = await db.collection(collectionName).findOne({ PopUpShopID });

            if (existingPopUpShop) {
                const { _id, ...updatedData } = req.body;
                // Perform the update
                await db.collection(collectionName).updateOne({ PopUpShopID }, { $set: updatedData });
                return res.status(200).json({ success: 'PopUpShop updated' });
            } else {
                return res.status(404).json({ error: "PopUpShop not found" });
            }

        } else {
            return res.status(400).json({ error: "Bad Request" });

        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred" });
    }
};
