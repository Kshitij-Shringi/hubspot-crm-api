const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.post("/add-contact", async (req, res) => {
  const { email, firstname, lastname, type } = req.body;

  // if (!email) {
  //   return res.status(400).json({ error: "Email is required" });
  // }

  // if (!type || !["Early Access", "Early Bird Perks", "Updates"].includes(type)) {
  //   return res.status(400).json({ 
  //     error: "Type is required and must be one of: Early Access, Early Bird Perks, Updates" 
  //   });
  // }

  try {
    // const response = await axios.post(
    //   "https://api.hubapi.com/crm/v3/objects/contacts",
    //   {
    //     properties: {
    //       email,
    //       firstname: firstname || "",
    //       lastname: lastname || "",
    //       type: type
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    res.status(201).json({ message: "Contact added", data: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add contact" });
  }
});

app.listen(PORT, () => {
  app.listen(PORT);
});
