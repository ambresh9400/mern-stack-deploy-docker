import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Simple model
const MessageSchema = new mongoose.Schema({
  text: String,
});
const Message = mongoose.model("Message", MessageSchema);

// API Routes
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

app.post("/message", async (req, res) => {
  const { text } = req.body;
  const msg = await Message.create({ text });
  res.json(msg);
});

app.get("/messages", async (req, res) => {
  const msgs = await Message.find();
  res.json(msgs);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
