import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { protect } from "../common/middlewares/protect.middlewares.js";
import passport from "passport";

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", protect, authController.getInfo);
authRouter.post("/refresh-token", authController.refreshToken);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  //   function (req, res) {
  //     // console.log("log  gg:  ", req.user);
  //     // // Successful authentication, redirect home.
  //     // // res.redirect("/");
  //   },
  authController.googleCallback,
);

export default authRouter;
