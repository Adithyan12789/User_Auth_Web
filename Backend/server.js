import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import { notFound, errorHandler } from "./Middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());
app.use(express.static('Backend/public'));

app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)

app.get('/', (req,res) => res.send("Server Is Ready and welcome adi"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Is Running On Port http://localhost:${port}/`));