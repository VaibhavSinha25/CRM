import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import express from "express";
import cors from "cors";
import connectToDatabase from "./db.js";
import customerRouter from "./routes/customerRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import segmentRouter from "./routes/segmentRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://crm-platform-eta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
const PORT = process.env.PORT || 3000;
connectToDatabase();

//ROUTES
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/segments", segmentRouter);
app.use("/api/campaigns", campaignRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
