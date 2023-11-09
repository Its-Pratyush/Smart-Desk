const express = require("express");
const app = express();
const port = 8000;
const connectToMongo = require("./db");
const cors = require("cors"); // Correct the import statement

connectToMongo();

// Allow only a specific origin (replace with your actual frontend URL)
const allowedOrigin = "https://smart-desk-sj4n.vercel.app/";

// Configure CORS options
const corsOptions = {
  origin: allowedOrigin,
  methods: ["POST", "PUT", "DELETE", "GET"],
  credentials: true,
};

// Use cors middleware with options
app.use(cors(corsOptions));

app.use(express.json());

// Available routes
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));
app.use("/api/todos", require("./Routes/todo"));

app.listen(port, () => {
  console.log(`smart desk backend http://localhost:${port}`);
});

