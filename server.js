import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.MONNIFY_API_KEY;

const SECRET_KEY = process.env.MONNIFY_SECRET_KEY;

const CONTRACT_CODE = process.env.MONNIFY_CONTRACT_CODE;

const BASE_URL = process.env.MONNIFY_BASE_URL;

// ============================
// GET ACCESS TOKEN
// ============================
async function getAccessToken() {

    const auth = Buffer.from(
        `${API_KEY}:${SECRET_KEY}`
    ).toString("base64");

    console.log("API KEY:", API_KEY);
    console.log("SECRET STARTS:", SECRET_KEY.substring(0,4));
    console.log("BASE URL:", BASE_URL);

    const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {},
        {
            headers: {
                Authorization: `Basic ${auth}`
            }
        }
    );

    console.log("TOKEN RECEIVED");

    return response.data.responseBody.accessToken;
}


// ====================================
// GENERATE RESERVED ACCOUNT
// ====================================

app.post("/generate-account", async (req, res) => {
console.log("Generate account endpoint hit");
    try {

        const token = await getAccessToken();

        const {

            fullName,

            email

        } = req.body;

        const response = await axios.post(

            `${BASE_URL}/api/v2/bank-transfer/reserved-accounts`,

            {

                accountReference: "NOVA_" + Date.now(),

                accountName: fullName,

                currencyCode: "NGN",

                contractCode: CONTRACT_CODE,

                customerEmail: email,

                customerName: fullName,

                getAllAvailableBanks: false,

                preferredBanks: [

                    "035"

                ]

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`,

                    "Content-Type": "application/json"

                }

            }

        );

        res.json(response.data);

    }

    catch (error) {

    console.log("==================================");
    console.log("MONNIFY ERROR:");
    console.log(error.response?.data);
    console.log(error.message);
    console.log("==================================");

    res.status(500).json({

        error: error.response?.data || error.message

    });

}

});

// ====================================
// START SERVER
// ====================================

app.listen(PORT, () => {

    console.log(`NovaPay Server running on port ${PORT}`);

});