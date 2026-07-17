const axios = require("axios");
require("dotenv").config(); 

async function authenticate() {

    const auth = Buffer.from(
        process.env.MONNIFY_API_KEY + ":" + process.env.MONNIFY_SECRET_KEY
    ).toString("base64");

    const response = await axios.post(
        process.env.MONNIFY_BASE_URL + "/api/v1/auth/login",
        {},
        {
            headers: {
                Authorization: "Basic " + auth
            }
        }
    );

    return response.data.responseBody.accessToken;

} 
async function createReservedAccount(customerName, customerEmail) {

    const accessToken = await authenticate();

    const response = await axios.post(
        process.env.MONNIFY_BASE_URL + "/api/v2/bank-transfer/reserved-accounts",
        {
            accountReference: "NOVA-" + Date.now(),
            accountName: customerName,
            currencyCode: "NGN",
            contractCode: process.env.MONNIFY_CONTRACT_CODE,
            customerName: customerName,
            customerEmail: customerEmail,
            getAllAvailableBanks: true
        },
        {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }
    );

    return response.data;

} 
module.exports = {
    authenticate,
    createReservedAccount
};