

async function PostPopUpShop(argumentForBody) {

    try {
        const response = await fetch("/api/database/users/PostPopUpShop", {
            method: "POST",
            body: JSON.stringify(argumentForBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Handle the response as needed
    } catch (error) {
        console.error("Error in lib.database.apiFunctions.popUpShop.PostPopUpShop:", error);
    }
}

export default PostPopUpShop;
