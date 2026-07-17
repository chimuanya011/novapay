const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.get("/", (req, res) => {
    res.send("NovaPay Backend is Running ✅");
}); 
app.get("/test-monnify", async (req, res) => {

        try {

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

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: error.response?.data || error.message
        });

    }

}); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`NovaPay Server running on port ${PORT}`);
});