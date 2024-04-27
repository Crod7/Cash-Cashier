// Takes email and sends to api to check to see if email already exists, eventually returns true or false detemining if user exists
// NOTE: does not get user data, just a validation of being in database

async function CheckUser(email) {

    try {
        const response = await fetch(`/api/database/users/CheckUser?email=${email}`);
        const data = await response.json();
        console.log(data)
        return data.exists;
    } catch (error) {
        console.error("Error in lib.database.apiFunctions.user.CheckUser:", error);
        return false;
    }
}

export default CheckUser;