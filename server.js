const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection");
require('dotenv').config();
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(errorHandler);
app.use(cors());
app.disable('x-powered-by'); // less hackers know about our stack
app.use(express.urlencoded({extended: false}));

// HTTP GET Request
app.use('/api', require("./routes/userRoutes"))
app.use('/api', require("./routes/uploadImageRoute"))


// Start serverr
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

