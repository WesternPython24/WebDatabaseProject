import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { getSessions } from "./server/sessions/session.js";



import express from "express";
const app = express();

app.use(express.json());
app.use(express.static("public")); //this took me so long to find 

import userRoutes from "./server/routes/user.js";
import storyRoutes from "./server/routes/story.js";
import storyUserRoutes from "./server/routes/storyUser.js";





app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/story", storyRoutes);
app.use("/storyUser", storyUserRoutes);

const PORT = 3500;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


console.log("Current sessions:", getSessions());








