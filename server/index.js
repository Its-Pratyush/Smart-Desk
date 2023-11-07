const express = require("express");
const app = express();
const port = 8000;
const connectToMongo = require("./db");
const cors = require(cors(
  {
    origin:["https://smart-desk-sj4n.vercel.app/"],
    methods:["POST", "PUT", "DELETE", "GET"],
    credentials: true
);

connectToMongo();
app.use(cors());
app.use(express.json());

//available routes

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));
app.use("/api/todos", require("./Routes/todo"));

app.listen(port, () => {
  console.log(`smart desk backend http://localhost:${port}`);
});
