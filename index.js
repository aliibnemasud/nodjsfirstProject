const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const users = require("./routes/v1/users.route.js");

app.use(cors());
app.use(express.json());


app.use("/user", users);

// api for all routes

app.get('/', (req, res) => {
  res.send('Server is running....')
})

app.all("*", (req, res)=> {
  res.send("No Routes found!");
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})