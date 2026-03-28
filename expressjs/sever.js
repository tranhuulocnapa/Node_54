import "dotenv/config";
import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/app-err.helper.js";
import cookieParser from "cookie-parser";
import { logApi } from "./src/common/middlewares/log-api.middleware.js";
import { initLoginGooglePassport } from "./src/common/passport/login-google.passport.js";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";
import { initSocket } from "./src/common/socket/init.socket.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//cookie cần để trước api
app.use(cookieParser());
app.use(express.json());
app.use(logApi("product"));
initLoginGooglePassport();

app.use(express.static("public"));

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const httpServer = initSocket(app);
// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   /* options */
// });

// io.on("connection", (socket) => {
//   console.log("socket-id: ", socket.id);
// });

app.use("/api", rootRouter);
app.use(appError);

const posts = 3069;
httpServer.listen(posts, () => {
  console.log(`Server is running on port ${posts}`);
});
