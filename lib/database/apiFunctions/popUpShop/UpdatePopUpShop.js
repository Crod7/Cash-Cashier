// Takes user object, uses its email to identify, sends user data with updated data to replace existing data

async function UpdatePopUpShop(popUpShop) {
    try {
        const response = await fetch(`/api/database/popUpShop/UpdatePopUpShop?PopUpShopID=${popUpShop.PopUpShopID}`, {
            method: "PATCH",
            body: JSON.stringify(popUpShop),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

    } catch (error) {
        console.error("Error in lib.database.apiFunctions.user.UpdatePopUpShop:", error);
    }
}

export default UpdatePopUpShop;