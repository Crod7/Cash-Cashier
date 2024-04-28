// We call the api to generate a new PopUpShopID by finding the highest value in the db and increasing it by 1.

async function GeneratePopUpShopID() {
    try {
        const response = await fetch(`/api/database/popUpShop/GeneratePopUpShopID`);
        const data = await response.json();
        console.log(data)

        // No PopUpShop exists so return 1 to start the count
        if (data == null) {
            console.log('No PopUpShopID was found, returning 1 isntead.')
            data.PopUpShopID = 1
        } else {
            // Highest value found, so increment by 1
            data.PopUpShopID = data.PopUpShopID + 1
        }
        return data;
    } catch (error) {
        console.error("Error in lib.database.apiFunctions.popUpShop.GeneratePopUpShopID:", error);
        return;
    }
}

export default GeneratePopUpShopID;