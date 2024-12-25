import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import router from "./Routes/router";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const corsOptions ={
  origin:'*', 
  credentials:true, 
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
