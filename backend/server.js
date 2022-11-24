const express = require("expgitress");
const app = express();
require("dotenv").config();
// const cors = require("cors");
const port = process.env.PORT || 5000;
require("../../NamX/backend/config/dbConfig");
const bodyParser = require("body-parser");

// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/admin/adminRoutes"));
app.use("/api/car", require("./routes/admin/carRoutes"));
app.use("/api/type", require("./routes/admin/typeRoutes"));
app.use("/api/details", require("./routes/admin/detailsRoutes"));
app.use("/api/color", require("./routes/admin/colorRoutes"));
app.use("/api/image", require("./routes/admin/imageRoutes"));

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
