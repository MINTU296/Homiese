import express from 'express';
import cors from 'cors'
import {PORT,  ORIGIN} from './config/env.js'
import authRouter from "./route/auth.route.js";
import connectToDatabase from "./database/mongoose.js";
import cookieParser from "cookie-parser"
import profileRouter from "./route/profile.route.js";
import detailsRouter from "./route/details.route.js";
import chatRouter from "./route/chat.route.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}))

app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/profile" , profileRouter);
app.use("/api/v1/fetch", detailsRouter);
app.use("/api/v1/chat" , chatRouter);

app.get('/change', (req, res) => {
  res.send("Hello from the backend");
})

app.post('/change', (req, res) => {
  console.log(req.body);
})


app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server started on port http://localhost:${PORT}`);
})
