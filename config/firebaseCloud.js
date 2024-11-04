// firebaseCloud.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const plaid = require("plaid");

admin.initializeApp();

// Initialize the Plaid client
const client = new plaid.Client({
    clientID: 'YOUR_PLAID_CLIENT_ID',
    secret: 'YOUR_PLAID_SECRET',
    env: plaid.environments.sandbox, // Use 'sandbox' for testing, 'development' or 'production' for live
});

// Function to create a Plaid link token
exports.createLinkToken = functions.https.onRequest(async (req, res) => {
    try {
        const response = await client.createLinkToken({
            user: {
                client_user_id: req.body.clientUserId, // User ID from the client
            },
            client_name: "Your App Name",
            products: ["auth", "transactions"],
            language: "en",
            country_codes: ["US"],
        });
        res.json({ link_token: response.link_token });
    } catch (error) {
        console.error("Error creating link token:", error);
        res.status(500).send(error);
    }
});

// Add other functions here as needed

