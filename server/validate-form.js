const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const TURNSTILE_SECRET = "0x4AAAAAAA7a7whAhivvEgw3zk2fVOnuKpQ"; // Replace with your actual secret key

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/validate", async (req, res) => {
    const { "cf-turnstile-response": token } = req.body;

    if (!token) {
        return res.status(400).send("CAPTCHA response token is missing.");
    }

    try {
        const response = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", null, {
            params: {
                secret: TURNSTILE_SECRET,
                response: token,
            },
        });

        if (response.data.success) {
            res.send("Form submitted successfully!");
        } else {
            res.status(400).send("CAPTCHA verification failed.");
        }
    } catch (error) {
        console.error("Error verifying Turnstile token:", error);
        res.status(500).send("Internal server error.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
