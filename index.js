require('dotenv').config()
const StreamChat = require('stream-chat').StreamChat;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(upload());

const port = 3500;
app.post("/streamRegister", async(req,res) =>{
  const { phoneNumber } = req.body;
  try {
    const serverClient = StreamChat.getInstance(process.env.STREAM_API, process.env.STREAM_SECRET);
    await serverClient.upsertUsers([
      {
          id: phoneNumber,
          phoneNumber
      }
    ]);
    const token = serverClient.createToken(phoneNumber);
    return res.status(200).json({ token, phoneNumber });
  } catch (error) {}
});
app.get("/", async(req,res) =>{
  res.send('App is running')
  console.log('Wow')
});

app.listen(port, () => {
  console.log(`Listening on port ${port} (HTTP)...`);
});
