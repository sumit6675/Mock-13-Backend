require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRoute } = require("./Routes/user.route");
const { AppointmentRoute } = require("./Routes/appointment.route");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/user", userRoute);

app.use("/appointment", AppointmentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Mock 13");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("err", err);
  }
  console.log(`server is live at : ${process.env.port}`);
});
