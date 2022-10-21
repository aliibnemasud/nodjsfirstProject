const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const users = require("./routes/v1/users.route.js");

app.use(cors());
app.use(express.json());


app.use("/api/v1/user", users);

// api for all routes

app.all("*", (req, res)=> {
  res.send("No Route found!");
})

app.get('/', (req, res) => {
  res.send('Server is running....')
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})