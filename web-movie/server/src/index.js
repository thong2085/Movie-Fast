import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db/index.js";
import userRouter from "./routes/UserRouter.js";
import moviesRouter from "./routes/MoviesRouter.js";
import { errorHandler } from "./middlewares/errorMiddlewares.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// connect DB
connectDB();

// Main route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// other routes
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);

// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
