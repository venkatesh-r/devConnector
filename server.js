const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

//Add middleware
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

//Define Routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.port | 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
