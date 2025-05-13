const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");


const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

app.get("/call", (req, res) => {
  res.send("Hello World!");
});

app.post("/add-contact", async (req, res) => {
  console.log("Received request to add contact");
  const { email, firstname, lastname, type } = req.body;

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

    res.status(201).json({ message: "Contact added", data: response.data });
  } catch (error) {
    res.status(500).json({ error: "Failed to add contact" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
