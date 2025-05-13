const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Add Morgan middleware for HTTP request logging
app.use(morgan("dev"));
app.use(express.json());

app.post("/add-contact", async (req, res) => {
  const { email, firstname, lastname, type } = req.body;

  console.log("\n=== New Contact Creation Request ===");
  console.log("Request Body:", { email, firstname, lastname, type });

  if (!email) {
    console.log("Error: Email is missing");
    return res.status(400).json({ error: "Email is required" });
  }

  if (!type || !["Early Access", "Early Bird Perks", "Updates"].includes(type)) {
    console.log("Error: Invalid type value");
    return res.status(400).json({ 
      error: "Type is required and must be one of: Early Access, Early Bird Perks, Updates" 
    });
  }

  try {
    console.log("\nMaking HubSpot API call...");
    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        properties: {
          email,
          firstname: firstname || "",
          lastname: lastname || "",
          type: type
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("\nHubSpot API Response:");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data, null, 2));

    res.status(201).json({ message: "Contact added", data: response.data });
  } catch (error) {
    console.error("\n=== Error Details ===");
    console.error("Error Message:", error.message);
    console.error("Error Response:", error.response?.data);
    console.error("Error Status:", error.response?.status);
    res.status(500).json({ error: "Failed to add contact" });
  }
});

app.listen(PORT, () => {
  console.log(`\n=== Server Started ===`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV || "development");
});
