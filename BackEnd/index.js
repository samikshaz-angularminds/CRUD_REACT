const express = require("express");
const app = express();
const connectDB = require("./db/index");
const dotenv = require("dotenv");
const cors = require('cors')


dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const adminRoute = require("./route/admin.route");
const employeeRoute = require("./route/employee.route");
const newAdminRoute = require("./route/newadmin.route");

connectDB()
    .then((result) => {
        app.on("error", (error) => {
            console.log("Error has occurred while listening to the app: ", error);
        })


    }).catch((err) => {
        console.log("MongoDb connection has been failed", err);
    });

app.use("/admin", adminRoute);
app.use("/employee", employeeRoute);
app.use("/new-admin",newAdminRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("SERVER IS RUNNING ON PORT: ", process.env.PORT);
});