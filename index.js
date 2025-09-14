// webhook.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express().use(bodyParser.json());

// Token bạn đặt trong Facebook Developer khi cấu hình webhook
const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN";

// Xác thực webhook (Facebook gọi GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Nhận event từ Messenger (Facebook gọi POST)
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    console.log("New webhook event:", JSON.stringify(body, null, 2));
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook is listening on port ${PORT}`));
