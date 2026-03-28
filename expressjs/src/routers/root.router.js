import express from "express";
import articleRouter from "./article.router.js";
import authRouter from "./auth.routerr.js";
import userRouter from "./user.router.js";
import chatGroupRouter from "./chatGroup.router.js";
import chatMessageRouter from "./chat-message.router.js";

const rootRouter = express.Router();

rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat-groud", chatGroupRouter);
rootRouter.use("/chat-message", chatMessageRouter);

export default rootRouter;
