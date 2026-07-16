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

    res.json({
        success: true,
        message: "Monnify route is working."
    });

}); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`NovaPay Server running on port ${PORT}`);
});