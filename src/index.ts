import "reflect-metadata";
import { AppDataSource } from "./data-source";

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import router from './routes/index';
import { statusCodes } from "./helpers";

const statusCode = new statusCodes();


// Initialize environment variables ASAP
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: process.env.URL || "*",
    credentials: true
};
app.use(cors(corsOption));


// Root Endpoint

app.get('/', (_req, res) => {
    return statusCode.success(res, 'Server is up and running!');
});

// API Routes
app.use('/api/v1', router);


// Database Connection and Server Startup
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database connected successfully!");
        app.listen(PORT, () => {
            console.log(
                '\n#############################################' +
                '\n********************************************' +
                `\n  🚀 🛡️   SERVER RUNNING ON PORT ${PORT}  🛡️  🚀 ` +
                '\n********************************************' +
                '\n#############################################'
            );
        });
    })
    .catch((error) => {
        console.error("❌ Error during Database initialization:", error);
        process.exit(1);
    });

export { app };