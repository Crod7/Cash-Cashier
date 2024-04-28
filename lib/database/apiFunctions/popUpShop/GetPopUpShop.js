
async function GetPopUpShop(PopUpShopID) {
    try {
        const response = await fetch(`/api/database/popUpShop/GetPopUpShop?PopUpShopID=${PopUpShopID}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error in lib.database.apiFunctions.popUpShop.GetPopUpShop:", error);
        return;
    }
}

export default GetPopUpShop;