import express from 'express';
import cors from 'cors';

export const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// for Cross-Origin-Opener-Policy
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

app.get('/', (req, res) => {
  res.send('Hello, Food Share!');
});

import userRouter from "./routes/user.routes.js";

// routes
app.use("/api/user", userRouter);
