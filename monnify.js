const axios = require("axios");
require("dotenv").config();

async function authenticate() {
    const credentials = Buffer.from(
        `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const response = await axios({
        method: "post",
        url: `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
        headers: {
            Authorization: `Basic ${credentials}`
        }
    });

    return response.data.responseBody.accessToken;
} async function createReservedAccount(customerName, customerEmail) {

    const accessToken = await authenticate();

    const response = await axios({
        method: "post",
        url: `${process.env.MONNIFY_BASE_URL}/api/v2/bank-transfer/reserved-accounts`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        data: {
            accountReference: "NOVA-" + Date.now(),
            accountName: customerName,
            currencyCode: "NGN",
            contractCode: process.env.MONNIFY_CONTRACT_CODE,
            customerName: customerName,
            customerEmail: customerEmail,
            getAllAvailableBanks: true
        }
    });

    return response.data;
} 
module.exports = {
    authenticate,
    createReservedAccount
};
